"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { 
  ArrowLeft,
  Copy,
  Edit,
  Trash,
  Send,
  MoreVertical,
  CheckCircle,
  Clock,
  Eye,
  Link as LinkIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateInvoiceStatus, deleteInvoice, duplicateInvoice } from "@/actions/invoices"
import { toast } from "sonner"
import { InvoicePreview } from "@/components/invoices/invoice-preview"

interface InvoiceDetailsClientProps {
  initialInvoice: any
  company: any
  clients: any[]
}

export function InvoiceDetailsClient({ initialInvoice, company, clients }: InvoiceDetailsClientProps) {
  const router = useRouter()
  const [invoice, setInvoice] = useState(initialInvoice)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  const handleStatusChange = async (status: string) => {
    setIsUpdatingStatus(true)
    const res = await updateInvoiceStatus(invoice.id, status)
    if (res.success) {
      setInvoice({ ...invoice, status })
      toast.success(`Invoice marked as ${status}`)
    } else {
      toast.error(res.error || "Failed to update status")
    }
    setIsUpdatingStatus(false)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this invoice?")) return
    setIsDeleting(true)
    const res = await deleteInvoice(invoice.id)
    if (res.success) {
      toast.success("Invoice deleted")
      router.push("/dashboard/invoices")
    } else {
      toast.error(res.error || "Failed to delete")
      setIsDeleting(false)
    }
  }

  const handleDuplicate = async () => {
    toast.loading("Duplicating...")
    const res = await duplicateInvoice(invoice.id)
    if (res.success) {
      toast.dismiss()
      toast.success("Invoice duplicated")
      router.push(`/dashboard/invoices/${res.id}`)
    } else {
      toast.dismiss()
      toast.error(res.error || "Failed to duplicate")
    }
  }

  const handleCopyLink = () => {
    // Generate public link
    const url = `${window.location.origin}/view/${invoice.token || invoice.id}`
    navigator.clipboard.writeText(url)
    toast.success("Public link copied to clipboard")
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "DRAFT": return "bg-gray-200 text-gray-800"
      case "SENT": return "bg-blue-100 text-blue-800"
      case "VIEWED": return "bg-purple-100 text-purple-800"
      case "PAID": return "bg-green-100 text-green-800"
      case "PARTIALLY_PAID": return "bg-yellow-100 text-yellow-800"
      case "OVERDUE": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-full flex-col md:flex-row overflow-hidden bg-muted/40">
      
      {/* Sidebar / Details Panel */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex-col overflow-y-auto border-r bg-background flex">
        <div className="p-4 border-b sticky top-0 bg-background/95 backdrop-blur z-10 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/invoices")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground text-sm">
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/dashboard/invoices/new?duplicate=${invoice.id}`)}>
                {/* Normally we'd pass data to InvoiceBuilder for editing, but for now Edit can just be a placeholder or disabled if paid */}
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-red-600" disabled={isDeleting}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold">{invoice.invoiceNumber}</h2>
              <Badge variant="outline" className={getStatusColor(invoice.status)}>
                {invoice.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{invoice.client.name}</p>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Amount Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {invoice.currency} {(invoice.total - invoice.amountPaid).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Actions</h3>
            
            <Button className="w-full justify-start" onClick={handleCopyLink}>
              <LinkIcon className="mr-2 h-4 w-4" /> Copy Public Link
            </Button>
            
            {invoice.status === "DRAFT" && (
              <Button className="w-full justify-start" variant="outline" onClick={() => handleStatusChange("SENT")} disabled={isUpdatingStatus}>
                <Send className="mr-2 h-4 w-4" /> Mark as Sent
              </Button>
            )}
            
            {(invoice.status === "SENT" || invoice.status === "VIEWED" || invoice.status === "PARTIALLY_PAID") && (
              <Button className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50" variant="outline" onClick={() => handleStatusChange("PAID")} disabled={isUpdatingStatus}>
                <CheckCircle className="mr-2 h-4 w-4" /> Mark as Paid
              </Button>
            )}
            
            {invoice.status !== "OVERDUE" && invoice.status !== "PAID" && (
              <Button className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" variant="outline" onClick={() => handleStatusChange("OVERDUE")} disabled={isUpdatingStatus}>
                <Clock className="mr-2 h-4 w-4" /> Mark as Overdue
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Timeline</h3>
            <div className="text-sm border-l-2 border-muted pl-4 py-1 space-y-4">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                <p className="font-medium">Invoice Created</p>
                <p className="text-muted-foreground text-xs">{format(new Date(invoice.createdAt), "MMM d, yyyy h:mm a")}</p>
              </div>
              
              {invoice.status !== "DRAFT" && (
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-blue-500" />
                  <p className="font-medium">Invoice Sent</p>
                  {/* Mock date for now */}
                  <p className="text-muted-foreground text-xs">Updated status</p>
                </div>
              )}
              
              {(invoice.status === "VIEWED" || invoice.status === "PAID") && (
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-purple-500" />
                  <p className="font-medium">Client Viewed</p>
                  <p className="text-muted-foreground text-xs">Updated status</p>
                </div>
              )}
              
              {invoice.status === "PAID" && (
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-green-500" />
                  <p className="font-medium">Payment Received</p>
                  <p className="text-muted-foreground text-xs">Updated status</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex-col overflow-y-auto bg-muted flex">
        <div className="p-4 flex justify-center min-h-full">
          <InvoicePreview data={invoice} company={company} clients={clients} />
        </div>
      </div>
      
    </div>
  )
}
