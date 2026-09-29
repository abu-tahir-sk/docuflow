import { Metadata } from "next"
import { getInvoiceByToken } from "@/actions/invoices"
import { notFound } from "next/navigation"
import { InvoicePreview } from "@/components/invoices/invoice-preview"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export async function generateMetadata({ params }: { params: { token: string } }): Promise<Metadata> {
  const res = await getInvoiceByToken(params.token)
  if (!res.success || !res.invoice) return { title: "Invoice Not Found" }
  
  const inv: any = res.invoice;
  
  return {
    title: `Invoice ${inv.invoiceNumber} - ${inv.company.name}`,
    description: `Invoice from ${inv.company.name} for ${inv.client.name}`,
  }
}

export default async function PublicInvoicePage({ params }: { params: { token: string } }) {
  const res = await getInvoiceByToken(params.token)

  if (!res.success || !res.invoice) {
    notFound()
  }

  const invoice: any = res.invoice
  const company = invoice.company
  const client = invoice.client

  const getStatusColor = (status: string) => {
    switch(status) {
      case "PAID": return "bg-green-100 text-green-800 border-green-200"
      case "PARTIALLY_PAID": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "OVERDUE": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b py-4 px-6 sticky top-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          {company.logoUrl ? (
            <img src={company.logoUrl} alt={company.name} className="h-8 object-contain" />
          ) : (
            <div className="font-bold text-xl">{company.name}</div>
          )}
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <h1 className="font-medium text-slate-600 hidden sm:block">
            Invoice {invoice.invoiceNumber}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`px-3 py-1 text-sm ${getStatusColor(invoice.status)}`}>
            {invoice.status === "DRAFT" || invoice.status === "SENT" || invoice.status === "VIEWED" 
              ? "PENDING PAYMENT" 
              : invoice.status}
          </Badge>
          
          {/* We rely on the InvoicePreview download button for PDF download */}
        </div>
      </header>
      
      <main className="flex-1 flex justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl">
          {/* Reuse existing preview component */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
             <InvoicePreview 
                data={invoice} 
                company={company} 
                clients={[client]} // Pass only this client to avoid leaking others
             />
          </div>
        </div>
      </main>
    </div>
  )
}
