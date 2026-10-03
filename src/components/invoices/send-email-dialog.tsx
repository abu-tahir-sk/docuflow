"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { pdf } from "@react-pdf/renderer"
import { sendDocumentEmail } from "@/actions/email"
import { format } from "date-fns"

export function SendEmailDialog({
    data,
    company,
    clients,
    pdfDocument,
    trigger
}: {
    data: any
    company: any
    clients: any[]
    pdfDocument: any
    trigger?: React.ReactElement
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [to, setTo] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const isQuotation = !!data?.quotationNumber
    const documentType = isQuotation ? "Quotation" : "Invoice"
    const documentNumber = data?.quotationNumber || data?.invoiceNumber || "Draft"
    const validUntilDate = data?.dueDate || data?.validUntil
    const formattedValidUntil = validUntilDate ? format(new Date(validUntilDate), "MMM dd, yyyy") : ""
    const client = clients.find(c => c.id === data?.clientId)
    
    useEffect(() => {
        if (isOpen) {
            setTo(client?.email || "")
            setSubject(`${documentType} ${documentNumber} from ${company?.name || 'Us'}`)
            
            if (isQuotation) {
                setMessage(`Hello ${client?.name || 'Customer'},\n\nPlease find attached our quotation ${documentNumber} for your review.\n\nThe quotation is valid until ${formattedValidUntil}.\n\nPlease feel free to contact us if you have any questions.\n\nBest regards,\n${company?.name || 'The Team'}`)
            } else {
                setMessage(`Hello ${client?.name || 'Customer'},\n\nPlease find attached our invoice ${documentNumber}.\n\nPlease feel free to contact us if you have any questions.\n\nBest regards,\n${company?.name || 'The Team'}`)
            }
        }
    }, [isOpen, client, documentType, documentNumber, company, isQuotation, formattedValidUntil])

    async function handleSendEmail() {
        if (!to) {
            toast.error("Client email address is required.")
            return
        }

        if (!pdfDocument) {
            toast.error("Document is not ready to be sent yet.")
            return
        }

        setIsSending(true)
        try {
            // Generate PDF Blob
            const asPdf = pdf(pdfDocument)
            const blob = await asPdf.toBlob()
            const file = new File([blob], `${documentType.toLowerCase()}-${documentNumber}.pdf`, { type: "application/pdf" })

            // Prepare FormData
            const formData = new FormData()
            formData.append("to", to)
            formData.append("subject", subject)
            formData.append("message", message)
            formData.append("pdf", file)
            if (data?.id) {
                formData.append("documentId", data.id)
                formData.append("documentType", documentType.toUpperCase())
            }

            const res = await sendDocumentEmail(formData)
            if (res.success) {
                toast.success("Email sent successfully!")
                setIsOpen(false)
            } else {
                toast.error(res.error || "Failed to send email")
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred while sending.")
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={
                trigger || (
                    <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Send by Email
                    </Button>
                )
            } />
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Send {documentType} by Email</DialogTitle>
                    <DialogDescription>
                        Send this document directly to your client.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="to">To</Label>
                        <Input
                            id="to"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="client@example.com"
                        />
                        {!to && <p className="text-sm text-destructive font-medium">Client email address is required.</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            rows={8}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>
                
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSending}>
                        Cancel
                    </Button>
                    <Button onClick={handleSendEmail} disabled={isSending || !to}>
                        {isSending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Email
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
