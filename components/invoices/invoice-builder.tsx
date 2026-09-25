"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { invoiceSchema, InvoiceFormValues } from "@/lib/invoices/schema"
import { InvoiceEditor } from "./invoice-editor"
import { InvoicePreview } from "./invoice-preview"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createOrUpdateInvoice } from "@/actions/invoices"
import { useRouter } from "next/navigation"

interface InvoiceBuilderProps {
  clients: any[]
  company: any
}

export function InvoiceBuilder({ clients, company }: InvoiceBuilderProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")

  const form = useForm<any>({
    // @ts-ignore
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientId: "",
      currency: "INR",
      discountType: "PERCENTAGE",
      status: "DRAFT",
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      template: "minimal",
      items: [{ description: "", quantity: 1, unit: "Item", unitPrice: 0 }],
      notes: company?.defaultNotes || "",
      terms: company?.defaultTerms || "",
    }
  })

  async function onSubmit(data: any) {
    setIsSaving(true)
    try {
      const res = await createOrUpdateInvoice(data as InvoiceFormValues)
      if (res.success) {
        toast.success("Invoice saved successfully")
        router.push("/dashboard/invoices")
      } else {
        toast.error(res.error || "Failed to save invoice")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  // To build a truly split-screen editor on desktop, and tabs on mobile
  return (
    <div className="flex h-full flex-col md:flex-row overflow-hidden bg-muted/40">
      {/* Mobile Tabs */}
      <div className="md:hidden flex border-b bg-background">
        <button 
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === "edit" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
        >
          Edit
        </button>
        <button 
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === "preview" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
        >
          Preview
        </button>
      </div>

      {/* Editor Panel */}
      <div className={`w-full md:w-1/2 flex-col overflow-y-auto border-r bg-background ${activeTab === "preview" ? "hidden md:flex" : "flex"}`}>
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
          <h2 className="text-lg font-semibold">Invoice Builder</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/invoices")}>
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <InvoiceEditor form={form} clients={clients} />
        </div>
      </div>

      {/* Preview Panel */}
      <div className={`w-full md:w-1/2 flex-col overflow-y-auto bg-muted ${activeTab === "edit" ? "hidden md:flex" : "flex"}`}>
        <div className="p-4 flex justify-center min-h-full">
          <InvoicePreview data={form.watch()} company={company} clients={clients} />
        </div>
      </div>
    </div>
  )
}
