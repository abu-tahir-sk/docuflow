import { Metadata } from "next"
import { getInvoiceById } from "@/actions/invoices"
import { getCompanySettings } from "@/actions/company"
import { getClients } from "@/actions/clients"
import { requireUser } from "@/lib/auth/utils"
import { notFound } from "next/navigation"
import { InvoiceDetailsClient } from "./invoice-details-client"

export const metadata: Metadata = {
  title: "Invoice Details | DocuFlow",
  description: "View and manage invoice",
}

export default async function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  await requireUser()

  const [invoiceRes, companyRes, clientsRes] = await Promise.all([
    getInvoiceById(params.id),
    getCompanySettings(),
    getClients()
  ])

  if (!invoiceRes.success || !invoiceRes.invoice) {
    notFound()
  }

  const company = companyRes.success && companyRes.company ? companyRes.company : null
  const clients = clientsRes.success && clientsRes.clients ? clientsRes.clients : []

  return (
    <div className="h-[calc(100vh-4rem)]">
      <InvoiceDetailsClient 
        initialInvoice={invoiceRes.invoice} 
        company={company} 
        clients={clients} 
      />
    </div>
  )
}
