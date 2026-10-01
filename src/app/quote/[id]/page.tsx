"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, FileText } from "lucide-react"
import { toast } from "sonner"
import { useParams } from "next/navigation"

export default function ClientQuotationView() {
    // URL theke [id] ta niye aschi
    const params = useParams()
    const quoteId = params.id

    // Ekhane API theke Quotation er data fetch korar logic thakbe
    // apatoto ekti dummy data bebohar korchi UI ta dekhar jonno
    const quoteData = {
        quotationNumber: quoteId,
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        amount: "45,000"
    }

    const handleAction = async (status: "ACCEPTED" | "REJECTED") => {
        // Ekhane backend-e status update korar API call thakbe
        if (status === "ACCEPTED") {
            toast.success("Thank you! Quotation accepted successfully.")
        } else {
            toast.success("Quotation declined.")
        }
    }

    return (
        <div className="min-h-screen bg-muted/20 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Client Interaction Bar - Sticky at the top */}
                <div className="bg-background/80 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between sticky top-4 z-50 mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Quotation #{quoteData.quotationNumber}</h2>
                            <p className="text-sm text-muted-foreground">
                                Valid until: {quoteData.validUntil.toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full md:w-auto gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 md:flex-none border-red-500/20 text-red-500 hover:bg-red-500/10"
                            onClick={() => handleAction("REJECTED")}
                        >
                            <XCircle className="w-4 h-4 mr-2" /> Decline
                        </Button>
                        <Button
                            className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleAction("ACCEPTED")}
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Accept & Sign
                        </Button>
                    </div>
                </div>

                {/* Ekhane apnar Quotation PDF Preview ta dekhate paren (InvoicePreview er moto) */}
                <div className="bg-white rounded-xl shadow-sm border min-h-[800px] flex items-center justify-center text-muted-foreground">
                    PDF Preview Section (Will be integrated soon)
                </div>
            </div>
        </div>
    )
}