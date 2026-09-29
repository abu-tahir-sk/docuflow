"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { 
  FileText, 
  Search, 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Copy, 
  Trash,
  Download
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { duplicateInvoice, deleteInvoice } from "@/actions/invoices"
import { toast } from "sonner"

export function InvoiceListClient({ initialInvoices }: { initialInvoices: any[] }) {
  const router = useRouter()
  const [invoices, setInvoices] = useState(initialInvoices)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  
  // Filtering
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.name.toLowerCase().includes(search.toLowerCase())
      
    const matchesStatus = statusFilter === "ALL" || inv.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Metrics
  const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.total, 0)
  const totalPaid = invoices.filter(inv => inv.status === "PAID").reduce((acc, inv) => acc + inv.total, 0)
  const totalPending = invoices.filter(inv => ["SENT", "VIEWED", "PARTIALLY_PAID"].includes(inv.status)).reduce((acc, inv) => acc + (inv.total - inv.amountPaid), 0)
  const totalOverdue = invoices.filter(inv => inv.status === "OVERDUE").reduce((acc, inv) => acc + (inv.total - inv.amountPaid), 0)

  const handleDuplicate = async (id: string) => {
    toast.loading("Duplicating invoice...")
    const res = await duplicateInvoice(id)
    if (res.success) {
      toast.dismiss()
      toast.success("Invoice duplicated")
      router.push(`/dashboard/invoices/${res.id}`)
    } else {
      toast.dismiss()
      toast.error(res.error || "Failed to duplicate")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return
    setIsDeleting(id)
    const res = await deleteInvoice(id)
    if (res.success) {
      setInvoices(invoices.filter(i => i.id !== id))
      toast.success("Invoice deleted")
    } else {
      toast.error(res.error || "Failed to delete")
    }
    setIsDeleting(null)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "DRAFT": return "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "SENT": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "VIEWED": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "PAID": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "PARTIALLY_PAID": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "OVERDUE": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalInvoiced.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">₹{totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalOverdue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices or clients..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(val: any) => setStatusFilter(val || "ALL")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="SENT">Sent</SelectItem>
              <SelectItem value="VIEWED">Viewed</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PARTIALLY_PAID">Partially Paid</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link href="/dashboard/invoices/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Invoice
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-8 w-8 mb-2 opacity-20" />
                    <p>No invoices found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/invoices/${invoice.id}`} className="hover:underline">
                      {invoice.invoiceNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.client.name}</TableCell>
                  <TableCell>{format(new Date(invoice.issueDate), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    {invoice.currency} {invoice.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground" disabled={isDeleting === invoice.id}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/dashboard/invoices/${invoice.id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDuplicate(invoice.id)}>
                          <Copy className="mr-2 h-4 w-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDelete(invoice.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
