import { z } from "zod"
import { designSettingsSchema } from "../design-system/schema"

export const quotationItemSchema = z.object({
    id: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    quantity: z.coerce.number().min(0.01, "Quantity must be > 0"),
    unit: z.string().min(1, "Unit is required"),
    unitPrice: z.coerce.number().min(0, "Unit price cannot be negative"),
    discountType: z.enum(["PERCENTAGE", "FIXED"]).nullable().optional(),
    discountValue: z.coerce.number().min(0).optional(),
    taxRate: z.coerce.number().min(0).optional(),
})

export const quotationSchema = z.object({
    id: z.string().optional(),
    clientId: z.string().min(1, "Client is required"),
    quotationNumber: z.string().optional(),
    issueDate: z.coerce.date(),
    validUntil: z.coerce.date(), // Unique to quotations
    currency: z.string().default("INR"),
    status: z.enum(["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED"]).default("DRAFT"),
    discountType: z.enum(["PERCENTAGE", "FIXED"]).nullable().optional(),
    discountValue: z.coerce.number().min(0).optional(),
    notes: z.string().optional(),
    terms: z.string().optional(),
    template: z.string().default("classic"),
    designSettings: designSettingsSchema.optional().nullable(),
    companyDetails: z.object({
        name: z.string().optional(),
        address: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        taxId: z.string().optional(),
        logoUrl: z.string().optional(),
        signatureUrl: z.string().optional(),
        sealUrl: z.string().optional(),
    }).optional(),
    items: z.array(quotationItemSchema).min(1, "At least one item is required"),
})

export type QuotationFormValues = z.infer<typeof quotationSchema>