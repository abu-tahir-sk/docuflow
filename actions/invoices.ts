"use server"

import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth/utils"
import { invoiceSchema } from "@/lib/invoices/schema"
import { calculateInvoiceTotals, InvoiceItemData } from "@/lib/invoices/calculations"
import { revalidatePath } from "next/cache"

async function generateInvoiceNumber(companyId: string): Promise<string> {
  const currentYear = new Date().getFullYear()
  
  // Find the highest invoice number for this company in the current year
  const lastInvoice = await prisma.invoice.findFirst({
    where: {
      companyId,
      invoiceNumber: {
        startsWith: `INV-${currentYear}-`
      }
    },
    orderBy: {
      invoiceNumber: "desc"
    }
  })

  let nextSequence = 1
  if (lastInvoice) {
    const parts = lastInvoice.invoiceNumber.split("-")
    if (parts.length === 3) {
      const lastSequence = parseInt(parts[2], 10)
      if (!isNaN(lastSequence)) {
        nextSequence = lastSequence + 1
      }
    }
  }

  return `INV-${currentYear}-${nextSequence.toString().padStart(4, "0")}`
}

export async function createOrUpdateInvoice(data: any) {
  try {
    const company = await getUserCompany()
    
    // Parse input
    const parsedData = invoiceSchema.parse(data)
    
    // Verify client belongs to company
    const client = await prisma.client.findFirst({
      where: { id: parsedData.clientId, companyId: company.id }
    })
    
    if (!client) {
      throw new Error("Invalid client")
    }

    // Server-side calculation of totals
    const calcInput: InvoiceItemData[] = parsedData.items.map(item => ({
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discountValue: item.discountValue,
      discountType: item.discountType,
      taxRate: item.taxRate,
    }))
    
    const totals = calculateInvoiceTotals(
      calcInput, 
      parsedData.discountValue, 
      parsedData.discountType
    )
    
    let invoice;

    if (parsedData.id) {
      // Check if invoice belongs to company
      const existing = await prisma.invoice.findFirst({
        where: { id: parsedData.id, companyId: company.id }
      })
      if (!existing) throw new Error("Invoice not found or unauthorized")

      // Update
      invoice = await prisma.invoice.update({
        where: { id: parsedData.id },
        data: {
          clientId: parsedData.clientId,
          issueDate: parsedData.issueDate,
          dueDate: parsedData.dueDate,
          currency: parsedData.currency,
          status: parsedData.status,
          paymentTerms: parsedData.paymentTerms,
          notes: parsedData.notes,
          terms: parsedData.terms,
          template: parsedData.template,
          
          discountType: parsedData.discountType,
          discountValue: parsedData.discountValue,
          
          subtotal: totals.subtotal,
          taxAmount: totals.taxTotal,
          total: totals.grandTotal,
          
          // Overwrite items
          items: {
            deleteMany: {},
            create: parsedData.items.map((item, i) => ({
              description: item.description,
              quantity: item.quantity,
              unit: item.unit,
              unitPrice: item.unitPrice,
              discountType: item.discountType,
              discountValue: item.discountValue,
              taxRate: item.taxRate,
              amount: (item.quantity * item.unitPrice) - (item.discountValue || 0), // Simplified, precise logic is in totals but per-item here
              sortOrder: i
            }))
          }
        },
        include: { items: true }
      })
    } else {
      // Create new
      const invoiceNumber = parsedData.invoiceNumber || await generateInvoiceNumber(company.id)
      
      invoice = await prisma.invoice.create({
        data: {
          companyId: company.id,
          clientId: parsedData.clientId,
          invoiceNumber,
          issueDate: parsedData.issueDate,
          dueDate: parsedData.dueDate,
          currency: parsedData.currency,
          status: parsedData.status || "DRAFT",
          paymentTerms: parsedData.paymentTerms,
          notes: parsedData.notes,
          terms: parsedData.terms,
          template: parsedData.template,
          
          discountType: parsedData.discountType,
          discountValue: parsedData.discountValue,
          
          subtotal: totals.subtotal,
          taxAmount: totals.taxTotal,
          total: totals.grandTotal,
          amountPaid: 0,
          
          items: {
            create: parsedData.items.map((item, i) => ({
              description: item.description,
              quantity: item.quantity,
              unit: item.unit,
              unitPrice: item.unitPrice,
              discountType: item.discountType,
              discountValue: item.discountValue,
              taxRate: item.taxRate,
              amount: (item.quantity * item.unitPrice) - (item.discountValue || 0),
              sortOrder: i
            }))
          }
        },
        include: { items: true }
      })
    }

    revalidatePath("/dashboard/invoices")
    return { success: true, invoice }
    
  } catch (error: any) {
    console.error("Invoice action error:", error)
    return { success: false, error: error.message || "An error occurred" }
  }
}

export async function deleteInvoice(id: string) {
  try {
    const company = await getUserCompany()
    
    // Check if invoice belongs to company
    const existing = await prisma.invoice.findFirst({
      where: { id, companyId: company.id }
    })
    
    if (!existing) throw new Error("Invoice not found or unauthorized")
    
    await prisma.invoice.delete({
      where: { id }
    })
    
    revalidatePath("/dashboard/invoices")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred" }
  }
}

export async function getInvoices() {
  try {
    const company = await getUserCompany()
    const invoices = await prisma.invoice.findMany({
      where: { companyId: company.id },
      include: { client: true },
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, invoices }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred" }
  }
}

export async function getInvoiceById(id: string) {
  try {
    const company = await getUserCompany()
    const invoice = await prisma.invoice.findFirst({
      where: { id, companyId: company.id },
      include: { client: true, items: { orderBy: { sortOrder: 'asc' } } }
    })
    if (!invoice) throw new Error("Invoice not found")
    return { success: true, invoice }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred" }
  }
}

export async function getInvoiceByToken(token: string) {
  try {
    const invoice = await prisma.invoice.findFirst({
      where: { token },
      include: { 
        client: true, 
        items: { orderBy: { sortOrder: 'asc' } },
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            address: true,
            email: true,
            phone: true,
            website: true,
            taxId: true,
            paymentMethod: true,
            bankName: true,
            accountName: true,
            accountNumber: true,
            ifsc: true,
            upiId: true,
            paymentInstructions: true,
            defaultNotes: true,
            defaultTerms: true,
          }
        }
      }
    })
    if (!invoice) throw new Error("Invoice not found")
    
    // Mark as VIEWED if it's currently SENT
    if (invoice.status === "SENT") {
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: "VIEWED" }
      })
      invoice.status = "VIEWED"
    }
    
    return { success: true, invoice }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred" }
  }
}

export async function updateInvoiceStatus(id: string, status: string) {
  try {
    const company = await getUserCompany()
    const invoice = await prisma.invoice.findFirst({
      where: { id, companyId: company.id }
    })
    if (!invoice) throw new Error("Invoice not found")
    
    await prisma.invoice.update({
      where: { id },
      data: { status }
    })
    revalidatePath("/dashboard/invoices")
    revalidatePath(`/dashboard/invoices/${id}`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred" }
  }
}

export async function duplicateInvoice(id: string) {
  try {
    const company = await getUserCompany()
    const original = await prisma.invoice.findFirst({
      where: { id, companyId: company.id },
      include: { items: true }
    })
    if (!original) throw new Error("Invoice not found")
    
    const invoiceNumber = await generateInvoiceNumber(company.id)
    
    const duplicate = await prisma.invoice.create({
      data: {
        companyId: company.id,
        clientId: original.clientId,
        invoiceNumber,
        issueDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 15)),
        currency: original.currency,
        status: "DRAFT",
        paymentTerms: original.paymentTerms,
        notes: original.notes,
        terms: original.terms,
        template: original.template,
        discountType: original.discountType,
        discountValue: original.discountValue,
        subtotal: original.subtotal,
        taxAmount: original.taxAmount,
        total: original.total,
        amountPaid: 0,
        items: {
          create: original.items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            discountType: item.discountType,
            discountValue: item.discountValue,
            taxRate: item.taxRate,
            amount: item.amount,
            sortOrder: item.sortOrder
          }))
        }
      }
    })
    revalidatePath("/dashboard/invoices")
    return { success: true, id: duplicate.id }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred" }
  }
}
