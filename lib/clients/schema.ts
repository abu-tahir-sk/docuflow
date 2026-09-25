import { z } from "zod"

export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Contact name is required"),
  clientCompany: z.string().optional().nullable(),
  email: z.string().email("Invalid email").optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
})

export type ClientFormValues = z.infer<typeof clientSchema>
