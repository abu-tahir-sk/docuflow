import { Metadata } from "next"
import { InvoiceBuilder } from "@/components/invoices/invoice-builder"
import { getClients } from "@/actions/clients"
import { getCompanySettings } from "@/actions/company"
import { requireUser } from "@/lib/auth/utils"

export const metadata: Metadata = {
  title: "New Invoice | DocuFlow",
  description: "Create a new professional invoice",
}

export default async function NewInvoicePage() {
  await requireUser() // Ensure authenticated

  const [clientsRes, companyRes] = await Promise.all([
    getClients(),
    getCompanySettings()
  ])

  // In a real app, you might want to handle these errors gracefully
  // or redirect to a settings page if company is not set up
  const clients = clientsRes.success && clientsRes.clients ? clientsRes.clients : []
  const company = companyRes.success && companyRes.company ? companyRes.company : null

  return (
    <div className="h-[calc(100vh-4rem)]">
      <InvoiceBuilder clients={clients} company={company} />
    </div>
  )
}
