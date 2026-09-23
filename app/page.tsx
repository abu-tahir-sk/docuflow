"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { 
  FileText, Shield, Zap, CheckCircle2, ArrowRight,
  Calculator, FileBadge, Lock, Fingerprint, Cloud, PlayCircle
} from "lucide-react"

// Import Mockups
import { HeroDashboardMockup } from "@/components/mockups/hero-dashboard"
import { InvoicePreviewMockup } from "@/components/mockups/invoice-preview"
import { ClientProfileMockup } from "@/components/mockups/client-profile"
import { AgreementPreviewMockup } from "@/components/mockups/agreement-preview"
import { AnalyticsDashboardMockup } from "@/components/mockups/analytics-dashboard"
import { useState } from "react"
import { Variants } from "framer-motion"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"invoice" | "quotation" | "analytics">("invoice")

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans overflow-hidden">
      <Navbar />
      <main className="flex-1">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
          {/* Animated Background Gradients */}
          <div className="absolute top-1/4 -left-1/4 w-full max-w-3xl h-[500px] bg-blue-600/20 dark:bg-blue-600/30 rounded-full blur-[120px] -z-10 mix-blend-screen" />
          <div className="absolute bottom-1/4 -right-1/4 w-full max-w-3xl h-[500px] bg-purple-600/20 dark:bg-purple-600/30 rounded-full blur-[120px] -z-10 mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background -z-20" />
          
          {/* Floating Particles (CSS simulated) */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light -z-20" />

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Copy */}
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={staggerContainer} 
                className="space-y-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
              >
                <motion.div variants={fadeUp} className="space-y-4">
                  <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.05]">
                    Automate Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Workflows.</span>
                  </h1>
                  <p className="text-muted-foreground md:text-xl leading-relaxed max-w-[500px] mx-auto lg:mx-0">
                    AI-powered solutions to boost your productivity.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button size="lg" className="w-full sm:w-auto px-8 h-14 text-base rounded-full shadow-lg shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all hover:scale-105">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-14 text-base rounded-full gap-2 border-border/50 hover:bg-muted/50 backdrop-blur-sm">
                    Book Demo
                  </Button>
                </motion.div>

                {/* Stats */}
                <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-8 border-t border-border/40">
                  <div>
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 text-foreground font-bold text-xl md:text-2xl">
                      <span className="text-blue-500">~</span> 10K+
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">Active Teams</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 text-foreground font-bold text-xl md:text-2xl">
                      <Shield className="h-4 w-4 md:h-5 md:w-5 text-purple-500" /> 99.9%
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">Uptime</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 text-foreground font-bold text-xl md:text-2xl">
                      <Zap className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" /> 2.5M+
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">Automations Run</p>
                  </div>
                </motion.div>

                {/* Brands */}
                <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-6 pt-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="font-bold text-xl font-serif">airbnb</div>
                  <div className="font-bold text-xl flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-foreground inline-block"></span> Spotify</div>
                  <div className="font-bold text-xl">coinbase</div>
                  <div className="font-bold text-xl"># slack</div>
                </motion.div>
              </motion.div>

              {/* Right Column: Floating Dashboard */}
              <motion.div 
                initial={{ opacity: 0, x: 40, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="relative lg:-mr-12 xl:-mr-24 perspective-1000 hidden md:block"
              >
                {/* Glowing edge effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 rounded-2xl blur-xl" />
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-sm" />
                
                {/* Dashboard Container */}
                <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl transform-gpu hover:scale-[1.02] transition-transform duration-500">
                  <HeroDashboardMockup />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. TRUSTED BY / SOCIAL PROOF */}
        <section className="py-12 border-y border-border/40 bg-muted/20">
          <div className="container px-4 mx-auto text-center">
            <p className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
              Designed for modern businesses
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {["Nova Studio", "PixelCraft", "TechFlow", "Bright Agency", "Vertex Labs"].map((brand) => (
                <div key={brand} className="text-xl md:text-2xl font-bold font-serif text-foreground/80">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PRODUCT SHOWCASE TABS */}
        <section className="py-24 bg-background">
          <div className="container px-4 mx-auto text-center max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Not just creating documents—manage your entire workflow.</h2>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Manage every step from client to payment from one place.
              </p>
            </motion.div>

            <div className="flex justify-center gap-2 mb-12 bg-muted/50 p-1 rounded-full w-fit mx-auto border border-border/50">
              <Button 
                variant={activeTab === "invoice" ? "default" : "ghost"} 
                className="rounded-full px-6"
                onClick={() => setActiveTab("invoice")}
              >Invoice</Button>
              <Button 
                variant={activeTab === "quotation" ? "default" : "ghost"} 
                className="rounded-full px-6"
                onClick={() => setActiveTab("quotation")}
              >Quotation</Button>
              <Button 
                variant={activeTab === "analytics" ? "default" : "ghost"} 
                className="rounded-full px-6"
                onClick={() => setActiveTab("analytics")}
              >Analytics</Button>
            </div>

            <div className="relative min-h-[500px]">
              {activeTab === "invoice" && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                  <HeroDashboardMockup />
                </motion.div>
              )}
              {activeTab === "quotation" && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex justify-center">
                  <AgreementPreviewMockup />
                </motion.div>
              )}
              {activeTab === "analytics" && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="max-w-4xl mx-auto">
                  <AnalyticsDashboardMockup />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* 4. INVOICE FEATURE */}
        <section className="py-24 bg-muted/30 border-t border-border/50 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <InvoicePreviewMockup />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Create professional invoices in minutes.</h2>
                <p className="text-lg text-muted-foreground">
                  Create beautiful invoices that match your brand. Automatic tax calculation and payment tracking.
                </p>
                <ul className="space-y-3 pt-4">
                  {[
                    "Automatic calculation", "GST/Tax support", "Custom branding", 
                    "PDF download", "Email delivery", "Payment tracking"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-green-500" /> {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. WORKFLOW SECTION */}
        <section className="py-24 bg-background">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">From Quotation to Payment—everything is connected.</h2>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 z-0" />
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10"
              >
                {[
                  { title: "Quotation", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
                  { title: "Sent", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
                  { title: "Client Accepted", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
                  { title: "Invoice", icon: FileBadge, color: "text-purple-500", bg: "bg-purple-500/10" },
                  { title: "Payment", icon: Shield, color: "text-primary", bg: "bg-primary/10" },
                ].map((step, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-card border border-border p-4 rounded-xl shadow-sm flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-colors">
                    <div className={`p-3 rounded-full ${step.bg}`}>
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <p className="font-semibold text-sm">{step.title}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. CLIENT MANAGEMENT */}
        <section className="py-24 bg-muted/20 border-y border-border/50 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6 order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">All your clients, all information in one place.</h2>
                <p className="text-lg text-muted-foreground">
                  From client contact details to all their invoices, payment history, and agreements—everything on one dashboard.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {["Client history", "Invoice history", "Payment history", "Quotations", "Agreements"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 font-medium bg-background p-3 rounded-lg border border-border shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="order-1 md:order-2">
                <ClientProfileMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. AGREEMENT & SIGNATURE */}
        <section className="py-24 bg-background">
          <div className="container px-4 mx-auto text-center max-w-5xl space-y-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Create, sign, and save agreements.</h2>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto mb-12">
                Complete documents with digital signatures and save them in the secure cloud.
              </p>
              <AgreementPreviewMockup />
            </motion.div>
          </div>
        </section>

        {/* 8. ANALYTICS */}
        <section className="py-24 bg-muted/30 border-y border-border/50">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <AnalyticsDashboardMockup />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Understand your business finances at a glance.</h2>
                <p className="text-lg text-muted-foreground">
                  See clearly which client has given how much work, pending payments, and your business's monthly growth.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {["Monthly revenue", "Paid invoices", "Pending invoices", "Top clients"].map((badge, i) => (
                    <Badge key={i} variant="outline" className="px-4 py-2 text-sm bg-background">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 9. DOCUMENT TEMPLATES */}
        <section className="py-24 bg-background">
          <div className="container px-4 mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Documents that look like your brand.</h2>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Choose your favorite design from our professional template library.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[1/1.4] bg-muted/50 border border-border rounded-xl p-4 flex flex-col hover:border-primary/50 transition-colors shadow-sm group">
                  <div className="flex-1 bg-background rounded border border-border/50 shadow-sm relative overflow-hidden p-2">
                     <div className="w-1/3 h-2 bg-primary/20 rounded mb-4" />
                     <div className="space-y-1">
                       <div className="w-full h-1.5 bg-muted rounded" />
                       <div className="w-full h-1.5 bg-muted rounded" />
                       <div className="w-3/4 h-1.5 bg-muted rounded" />
                     </div>
                     {/* Hover overlay */}
                     <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">Preview</Button>
                     </div>
                  </div>
                  <p className="text-sm font-medium mt-3 text-center">Template #{i}</p>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="lg" className="rounded-full">
              View all Templates →
            </Button>
          </div>
        </section>

        {/* 10. SECURITY */}
        <section className="py-24 bg-slate-950 text-slate-50 dark:bg-background dark:text-foreground border-y border-border/50">
          <div className="container px-4 mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Keep your business information safe.</h2>
              <p className="text-slate-400 dark:text-muted-foreground md:text-lg max-w-2xl mx-auto">
                All your data is protected with enterprise-grade security.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Secure Authentication", icon: Lock },
                { title: "Role-based Access", icon: Fingerprint },
                { title: "Secure Cloud Storage", icon: Cloud },
                { title: "Protected Data", icon: Shield },
              ].map((sec, i) => (
                <div key={i} className="p-6 bg-slate-900 dark:bg-card border border-slate-800 dark:border-border rounded-xl text-center flex flex-col items-center">
                  <div className="bg-primary/20 p-4 rounded-full mb-4">
                    <sec.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">{sec.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. PRICING */}
        <section className="py-24 bg-background">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple pricing, no hidden charges.</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="p-8 border-border shadow-sm flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">₹0</span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {["5 documents", "3 clients", "Basic templates", "Community support"].map((ft, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" /> {ft}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline" size="lg">Start for free</Button>
              </Card>

              {/* Pro Plan */}
              <Card className="p-8 border-primary shadow-xl shadow-primary/10 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">₹499</span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {["Unlimited documents", "Unlimited clients", "Digital signature", "Email PDF delivery", "Advanced Analytics", "Priority support"].map((ft, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" /> {ft}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" size="lg">Start Pro</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* 12. FAQ (Simple implementation without accordion for speed, or basic CSS one) */}
        <section className="py-24 bg-muted/20 border-t border-border/50">
          <div className="container px-4 mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            </div>
            <div className="space-y-6">
              {[
                { q: "What is DocuFlow?", a: "DocuFlow is a modern platform where you can easily manage your business invoices, quotations, agreements, and clients." },
                { q: "Can I download PDFs?", a: "Yes, you can download any document as a PDF or email it directly to the client." },
                { q: "Can I add multiple team members?", a: "Yes, in our Pro plan, you can add multiple members and give role-based access." },
                { q: "Can I add GST to invoices?", a: "Yes, you can add custom tax or GST with each item." },
              ].map((faq, i) => (
                <div key={i} className="bg-background p-6 rounded-xl border border-border shadow-sm">
                  <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. FINAL CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 -z-10" />
          <div className="container px-4 mx-auto text-center max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Organize your business documents from today.</h2>
            <p className="text-xl text-muted-foreground">
              Invoice, quotation, and client management—everything in one place.
            </p>
            <div className="pt-4">
              <Button size="lg" className="px-10 h-14 text-lg rounded-full shadow-xl hover:shadow-primary/25 transition-all hover:scale-105">
                Start for free →
              </Button>
            </div>
          </div>
        </section>

      </main>
      
      {/* 14. FOOTER */}
      <Footer />
    </div>
  )
}
