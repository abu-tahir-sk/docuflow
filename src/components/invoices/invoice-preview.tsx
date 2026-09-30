"use client"

import React, { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { useWatch } from "react-hook-form"
import { InvoicePdf } from "./invoice-pdf"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"

// PDFDownloadLink shouldn't strictly need dynamic if used conditionally after mount, but doing it ensures no SSR issues.
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full w-full bg-white"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div> }
)

interface StaticInvoicePreviewProps {
  data: any
  company: any
  clients: any[]
}

export function StaticInvoicePreview({ data, company, clients }: StaticInvoicePreviewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pdfDocument = useMemo(() => {
    if (!data) return null
    return <InvoicePdf data={data} company={company} clients={clients} />
  }, [data, company, clients])

  if (!mounted) {
    return (
      <div className="w-full flex justify-center h-full pt-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center h-full">
      <div className="flex justify-end w-full max-w-[210mm] p-4">
        {pdfDocument && (
          <PDFDownloadLink
            document={pdfDocument}
            fileName={`invoice-${data?.invoiceNumber || 'draft'}.pdf`}
          >
            {({ loading }: any) => (
              <Button variant="default" size="sm" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>

      <div className="w-full max-w-[210mm] h-[calc(100vh-140px)] min-h-[800px] bg-white shadow-xl rounded-sm overflow-hidden border">
        {pdfDocument && (
          <PDFViewer width="100%" height="100%" className="border-none" showToolbar={false}>
            {pdfDocument}
          </PDFViewer>
        )}
      </div>
    </div>
  )
}

interface InvoicePreviewProps {
  form: any
  company: any
  clients: any[]
}

export function InvoicePreview({ form, company, clients }: InvoicePreviewProps) {
  const data = useWatch({ control: form.control })
  const [debouncedData, setDebouncedData] = useState(data)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData(data)
    }, 300)
    return () => clearTimeout(handler)
  }, [data])

  return <StaticInvoicePreview data={debouncedData} company={company} clients={clients} />
}
