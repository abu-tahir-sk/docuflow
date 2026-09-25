import { z } from "zod"

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  logoUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  email: z.string().email("Invalid email").optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  registrationNumber: z.string().optional().nullable(),
  
  paymentMethod: z.string().optional().nullable(),
  bankName: z.string().optional().nullable(),
  accountName: z.string().optional().nullable(),
  accountNumber: z.string().optional().nullable(),
  ifsc: z.string().optional().nullable(),
  upiId: z.string().optional().nullable(),
  paymentInstructions: z.string().optional().nullable(),
  
  defaultNotes: z.string().optional().nullable(),
  defaultTerms: z.string().optional().nullable(),
})

export type CompanyFormValues = z.infer<typeof companySchema>
