import { requireUser } from "@/lib/auth/utils"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, FileSignature, Clock, CheckCircle2, XCircle } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

export default async function QuotationsPage() {
    const user = await requireUser()

    const quotations = await prisma.quotation.findMany({
        where: { authorId: user.id },
        include: { client: true, items: true },
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Quotations</h1>
                    <p className="text-muted-foreground text-sm">Create and manage estimates for your prospective clients.</p>
                </div>
                <Link href="/dashboard/quotations/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> New Quotation
                    </Button>
                </Link>
            </div>

            {quotations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-card text-center min-h-[350px]">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <FileSignature className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">No quotations yet</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
                        Get started by sending professional, branded quotations to your clients.
                    </p>
                    <Link href="/dashboard/quotations/new">
                        <Button>Create Your First Quotation</Button>
                    </Link>
                </div>
            ) : (
                <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/40 border-b text-xs text-muted-foreground uppercase">
                            <tr>
                                <th className="p-4">Quotation</th>
                                <th className="p-4">Client</th>
                                <th className="p-4">Valid Until</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {quotations.map((quote) => (
                                <tr key={quote.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-semibold">{quote.quotationNumber}</td>
                                    <td className="p-4">{quote.client?.name}</td>
                                    <td className="p-4 text-muted-foreground">{format(new Date(quote.validUntil), "MMM dd, yyyy")}</td>
                                    <td className="p-4">
                                        <Badge variant={quote.status === "ACCEPTED" ? "default" : "secondary"}>
                                            {quote.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link href={`/quote/${quote.id}`} target="_blank">
                                            <Button variant="ghost" size="sm">Client View</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}