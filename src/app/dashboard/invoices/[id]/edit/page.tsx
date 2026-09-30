import { Metadata } from "next"
import { InvoiceBuilder } from "@/components/invoices/invoice-builder"
import { getClients } from "@/actions/clients"
import { getCompanySettings } from "@/actions/company"
import { getInvoiceById } from "@/actions/invoices"
import { requireUser } from "@/lib/auth/utils"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Edit Invoice | DocuFlow",
  description: "Edit an existing invoice",
}

export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  await requireUser()

  const [clientsRes, companyRes, invoiceRes] = await Promise.all([
    getClients(),
    getCompanySettings(),
    getInvoiceById(params.id)
  ])

  if (!invoiceRes.success || !invoiceRes.invoice) {
    redirect("/dashboard/invoices")
  }

  const clients = clientsRes.success && clientsRes.clients ? clientsRes.clients : []
  const company = companyRes.success && companyRes.company ? companyRes.company : null
  const invoice = invoiceRes.invoice

  return (
    <div className="h-[calc(100vh-4rem)]">
      <InvoiceBuilder clients={clients} company={company} initialData={invoice} />
    </div>
  )
}
