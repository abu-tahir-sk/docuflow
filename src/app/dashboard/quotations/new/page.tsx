import { requireUser } from "@/lib/auth/utils"
import { getClients } from "@/actions/clients"
import { getCompanySettings } from "@/actions/company"
import { QuotationBuilder } from "@/components/quotations/quotation-builder"

export default async function NewQuotationPage() {
    await requireUser()

    const [clientsRes, companyRes] = await Promise.all([
        getClients(),
        getCompanySettings()
    ])

    const clients = clientsRes.success && clientsRes.clients ? clientsRes.clients : []
    const company = companyRes.success && companyRes.company ? companyRes.company : null

    return (
        <div className="-m-4 md:-m-6 lg:-m-8 h-[calc(100vh-60px)]">
            <QuotationBuilder clients={clients} company={company} />
        </div>
    )
}