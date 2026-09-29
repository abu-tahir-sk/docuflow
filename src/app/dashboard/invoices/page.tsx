import { Metadata } from "next"
import { getInvoices } from "@/actions/invoices"
import { requireUser } from "@/lib/auth/utils"
import { InvoiceListClient } from "./invoice-list-client"
import { AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Invoices | DocuFlow",
  description: "Manage your invoices",
}

export default async function InvoicesPage() {
  await requireUser()

  const res = await getInvoices()

  if (!res.success) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-destructive">
          <AlertCircle className="h-8 w-8" />
          <p className="text-lg font-medium">Failed to load invoices</p>
          <p className="text-sm">{res.error}</p>
        </div>
      </div>
    )
  }

  const invoices = res.invoices || []

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">
          Manage and track all your invoices in one place.
        </p>
      </div>
      
      <InvoiceListClient initialInvoices={invoices} />
    </div>
  )
}
