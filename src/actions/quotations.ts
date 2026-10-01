"use server"

import { requireUser } from "@/lib/auth/utils"
import { prisma } from "@/lib/prisma"
import { quotationSchema, QuotationFormValues } from "@/lib/quotations/schema"
import { revalidatePath } from "next/cache"

export async function createOrUpdateQuotation(data: QuotationFormValues) {
    try {
        const user = await requireUser()
        const validatedData = quotationSchema.parse(data)

        // Generate a quotation number if not provided
        const quoteNumber = validatedData.quotationNumber || `QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

        const quotationData = {
            quotationNumber: quoteNumber,
            clientId: validatedData.clientId,
            authorId: user.id,
            issueDate: validatedData.issueDate,
            validUntil: validatedData.validUntil,
            currency: validatedData.currency,
            status: validatedData.status,
            discountType: validatedData.discountType,
            discountValue: validatedData.discountValue,
            notes: validatedData.notes,
            terms: validatedData.terms,
            template: validatedData.template,
            designSettings: validatedData.designSettings ? JSON.parse(JSON.stringify(validatedData.designSettings)) : null,
        }

        if (validatedData.id) {
            // Update existing
            await prisma.quotation.update({
                where: { id: validatedData.id, authorId: user.id },
                data: {
                    ...quotationData,
                    items: {
                        deleteMany: {}, // Clear old items
                        create: validatedData.items.map(item => ({
                            description: item.description,
                            quantity: item.quantity,
                            unit: item.unit,
                            unitPrice: item.unitPrice,
                            discountType: item.discountType,
                            discountValue: item.discountValue,
                            taxRate: item.taxRate,
                        }))
                    }
                }
            })
        } else {
            // Create new
            await prisma.quotation.create({
                data: {
                    ...quotationData,
                    items: {
                        create: validatedData.items.map(item => ({
                            description: item.description,
                            quantity: item.quantity,
                            unit: item.unit,
                            unitPrice: item.unitPrice,
                            discountType: item.discountType,
                            discountValue: item.discountValue,
                            taxRate: item.taxRate,
                        }))
                    }
                }
            })
        }

        revalidatePath("/dashboard/quotations")
        return { success: true }
    } catch (error: any) {
        console.error("Quotation Save Error:", error)
        return { success: false, error: error.message || "Failed to save quotation" }
    }
}