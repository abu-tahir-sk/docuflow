import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, FileSpreadsheet, Handshake, Users, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="w-full py-20 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-muted/20">
          <div className="container px-4 md:px-6 mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">DocuFlow V1.0 - Now Live</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight">
              All your business documents, <span className="text-primary block sm:inline">in one place.</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
              Easily manage invoices, quotations, agreements, clients, and payments. Give your business a smart and professional look.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" className="px-8 h-12 text-base shadow-lg transition-all hover:scale-105">
                Start for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-12 text-base">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-background border-t">
          <div className="container px-4 md:px-6 mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why use DocuFlow?</h2>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">DocuFlow is built with cutting-edge technology and an easy interface, which will make your business more dynamic.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                { title: "Easy Invoicing", desc: "Create professional invoices in a few clicks and send them to clients.", icon: FileSpreadsheet },
                { title: "Secure Agreements", desc: "Create and store secure agreements with digital signatures.", icon: Handshake },
                { title: "Client Management", desc: "Keep all client information, documents, and payment history in one place.", icon: Users },
                { title: "Bank-grade Security", desc: "All your data is encrypted and completely secure.", icon: ShieldCheck },
                { title: "Fast Performance", desc: "Work seamlessly on the fastest and most reliable platform.", icon: Zap },
                { title: "Access Anywhere", desc: "Work from any device — laptop, tablet, or mobile.", icon: Globe },
              ].map((feature, i) => (
                <Card key={i} className="border bg-card transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview / UI Showcase */}
        <section className="w-full py-20 bg-muted/30 border-t">
          <div className="container px-4 md:px-6 mx-auto space-y-12 max-w-6xl">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Premium User Interface</h2>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">Take a quick look at the design of our dashboard and components.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Left Column - Forms & Inputs */}
              <div className="space-y-6">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Add New Client</CardTitle>
                    <CardDescription>Fill in the basic information of the client.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company Name</label>
                      <Input placeholder="e.g. ABC Corporation" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input placeholder="email@example.com" type="email" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Save</Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-md">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Status Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <Badge variant="default">Completed</Badge>
                    <Badge variant="secondary">Pending</Badge>
                    <Badge variant="outline">Draft</Badge>
                    <Badge variant="destructive">Cancelled</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Dashboard Stats */}
              <div className="md:col-span-2 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                      <Zap className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$45,000</div>
                      <p className="text-xs text-green-600 font-medium mt-1">+12.5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Pending Invoices</CardTitle>
                      <FileText className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12</div>
                      <p className="text-xs text-orange-600 font-medium mt-1">Total $12,340 overdue</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>The latest documents you created</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Website Redesign Quotation", client: "ABC Corporation", status: "Approved", type: "Quotation" },
                        { title: "March Invoice", client: "Tech Solutions", status: "Pending", type: "Invoice" },
                        { title: "Annual Maintenance Contract", client: "Global Enterprise", status: "Draft", type: "Agreement" },
                      ].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                          <div className="space-y-1">
                            <p className="font-medium text-sm leading-none">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">{doc.client} • {doc.type}</p>
                          </div>
                          <Badge variant={doc.status === "Approved" ? "default" : doc.status === "Pending" ? "secondary" : "outline"}>
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
