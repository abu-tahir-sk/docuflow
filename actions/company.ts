"use server"

import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth/utils"
import { companySchema } from "@/lib/company/schema"
import { revalidatePath } from "next/cache"

export async function updateCompanySettings(data: any) {
  try {
    const company = await getUserCompany()
    
    // Validate the incoming data
    const parsedData = companySchema.parse(data)
    
    // Update the company
    const updatedCompany = await prisma.company.update({
      where: { id: company.id },
      data: parsedData,
    })
    
    revalidatePath("/dashboard")
    return { success: true, company: updatedCompany }
  } catch (error: any) {
    console.error("Failed to update company settings:", error)
    return { success: false, error: error.message || "Failed to update company settings" }
  }
}

export async function getCompanySettings() {
  try {
    const company = await getUserCompany()
    return { success: true, company }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
