import { z } from "zod"

export const invoiceItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(0.01, "Quantity must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  unitPrice: z.coerce.number().min(0, "Unit price cannot be negative"),
  discountType: z.enum(["PERCENTAGE", "FIXED"]).nullable().optional(),
  discountValue: z.coerce.number().min(0).optional(),
  taxRate: z.coerce.number().min(0).optional(),
})

export const invoiceSchema = z.object({
  id: z.string().optional(),
  clientId: z.string({ required_error: "Client is required", invalid_type_error: "Client is required" }).min(1, "Client is required"),
  companyId: z.string().optional(), // Injected by server usually
  
  invoiceNumber: z.string().optional(), // Auto-generated if not provided
  issueDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  currency: z.string().default("INR"),
  status: z.string().default("DRAFT"),
  paymentTerms: z.string().optional(),
  
  discountType: z.enum(["PERCENTAGE", "FIXED"]).nullable().optional(),
  discountValue: z.coerce.number().min(0).optional(),
  
  notes: z.string().optional(),
  terms: z.string().optional(),
  template: z.string().default("minimal"),
  
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
})

export type InvoiceFormValues = z.infer<typeof invoiceSchema>
export type InvoiceItemFormValues = z.infer<typeof invoiceItemSchema>
