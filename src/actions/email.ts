"use server"

import { sendDocumentEmail as sendDocumentEmailViaNodemailer } from "@/lib/email"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth/config"
import { prisma } from "@/lib/prisma"

export async function sendDocumentEmail(formData: FormData) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" }
        }

        const to = formData.get("to") as string
        const subject = formData.get("subject") as string
        const message = formData.get("message") as string
        const pdfFile = formData.get("pdf") as File
        const documentId = formData.get("documentId") as string
        const documentType = formData.get("documentType") as string // "QUOTATION" or "INVOICE"

        if (!to || !subject || !message || !pdfFile) {
            return { success: false, error: "Missing required fields" }
        }

        // Validate document ownership and existence if documentId is provided
        if (documentId && documentType === "QUOTATION") {
            const quotation = await prisma.quotation.findFirst({
                where: {
                    id: documentId,
                    authorId: session.user.id
                }
            })
            if (!quotation) {
                return { success: false, error: "Quotation not found or unauthorized" }
            }
        }

        const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer())

        const result = await sendDocumentEmailViaNodemailer(
            to,
            subject,
            message,
            pdfBuffer,
            pdfFile.name || "document.pdf"
        )

        if (!result.success) {
            return { success: false, error: "Failed to send email" }
        }

        // Update status if it's a quotation
        if (documentId && documentType === "QUOTATION") {
            try {
                await prisma.quotation.update({
                    where: { id: documentId },
                    data: { status: "SENT" }
                })
            } catch (err) {
                console.error("Failed to update quotation status:", err)
                // We don't fail the whole action if just status update fails
            }
        }

        return { success: true }
    } catch (error: any) {
        console.error("sendDocumentEmail error:", error)
        return { success: false, error: error.message || "An unexpected error occurred" }
    }
}
