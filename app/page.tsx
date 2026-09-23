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
        <section className="relative w-full pt-32 pb-0 overflow-hidden min-h-screen flex flex-col items-center justify-start bg-background text-foreground transition-colors duration-300">
          
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50 z-0" style={{ backgroundSize: '60px 60px', backgroundPosition: 'center' }} />

          {/* Sweeping Glowing Lines / Lights */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none" />
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80 dark:opacity-100" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 800">
            {/* The main bright sweeping ray */}
            <path d="M800 -100 C 1100 300, 1000 600, 1600 200" fill="none" stroke="currentColor" strokeWidth="8" filter="url(#glowStrong)" className="text-blue-200 dark:text-white opacity-80 dark:opacity-90" />
            <path d="M750 -100 C 1050 350, 950 650, 1600 150" fill="none" stroke="#60a5fa" strokeWidth="20" filter="url(#glowStrong)" opacity="0.3 dark:0.4" />
            <path d="M850 -100 C 1150 250, 1050 550, 1600 250" fill="none" stroke="#818cf8" strokeWidth="15" filter="url(#glowStrong)" opacity="0.2 dark:0.3" />
            <defs>
              <filter id="glowStrong" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Floating Stars */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
             <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-[20%] left-[25%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_#fff]" />
             <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="absolute top-[35%] left-[55%] w-1.5 h-1.5 bg-blue-200 rounded-full shadow-[0_0_12px_2px_#bfdbfe]" />
             <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }} className="absolute top-[65%] right-[25%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_#fff]" />
             <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 5, delay: 2 }} className="absolute bottom-[25%] left-[35%] w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_12px_2px_#60a5fa]" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[1200px] px-4 mt-8 mb-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="border border-border/50 bg-foreground/5 rounded-full px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md flex items-center gap-2 mb-6 shadow-sm dark:shadow-xl">
              <span className="text-foreground">✨</span> New: Our AI integration just landed
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-semibold tracking-tight leading-[1.1] text-foreground mb-6 w-full max-w-4xl mx-auto">
              Your Projects. Your Team. One <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">Powerful Dashboard.</span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-muted-foreground text-base md:text-lg max-w-[650px] mx-auto mb-8 leading-relaxed font-sans">
              Manage tasks, collaborate in real-time, and stay on top of your team's productivity—all in one beautifully intuitive workspace.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="relative z-50">
              <Button className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:opacity-90 text-white rounded-full px-10 h-14 text-[17px] font-medium shadow-[0_0_20px_rgba(91,97,244,0.3)] dark:shadow-[0_0_40px_rgba(91,97,244,0.6)] border-0 transition-all hover:scale-105 font-sans">
                Try DocuFlow Free
              </Button>
            </motion.div>
          </div>

          {/* Bottom Sphere / Planet */}
          <div className="absolute bottom-[-550px] left-1/2 -translate-x-1/2 w-[1400px] h-[700px] z-0 pointer-events-none">
            {/* Core sphere */}
            <div className="absolute inset-0 rounded-[100%] bg-blue-500/10 dark:bg-[#1e3a8a]/40 border-t-2 border-blue-400/30 dark:border-[#60a5fa]/40 blur-[2px] shadow-[0_-50px_100px_rgba(37,99,235,0.1)] dark:shadow-[0_-50px_100px_rgba(37,99,235,0.2)]" />
            <div className="absolute inset-10 rounded-[100%] bg-blue-600/10 dark:bg-[#2563eb]/30 border-t-2 border-blue-400/40 dark:border-[#93c5fd]/50 blur-[1px] shadow-[0_-30px_80px_rgba(59,130,246,0.2)] dark:shadow-[0_-30px_80px_rgba(59,130,246,0.4)]" />
            <div className="absolute inset-20 rounded-[100%] bg-gradient-to-t from-transparent to-blue-400/20 dark:to-[#3b82f6]/50 blur-[8px]" />
          </div>

          {/* Floating Glass Cards */}
          <div className="relative w-full max-w-[1050px] mx-auto flex justify-center items-end gap-5 z-20 h-[220px] px-4 pointer-events-none mt-auto pb-4">
            
            {/* Left Card */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="w-64 h-44 bg-background/60 backdrop-blur-2xl border border-border/50 rounded-3xl p-5 shadow-xl dark:shadow-2xl relative overflow-hidden flex flex-col justify-between mb-4 pointer-events-auto hover:bg-background/80 transition-colors hidden md:flex">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-10 mix-blend-soft-light" />
              <div className="relative z-10 w-full h-full flex flex-col justify-center items-center pb-2">
                <svg width="120" height="60" viewBox="0 0 120 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground opacity-90">
                  <path d="M20 40 C 30 20, 35 15, 40 35 C 45 55, 50 40, 55 35 C 60 30, 70 40, 75 35 C 80 30, 85 30, 95 35" />
                  <path d="M35 15 L 30 50" />
                  <line x1="30" y1="50" x2="90" y2="50" />
                  <line x1="45" y1="58" x2="75" y2="58" />
                </svg>
              </div>
              <div className="relative z-10 mt-auto flex justify-between w-full text-[11px] text-muted-foreground font-medium tracking-wide">
                <span>Joint Board</span>
                <span className="text-[#5b61f4]">Edited Now</span>
              </div>
            </motion.div>

            {/* Middle Card 1 (New Brief) */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }} className="w-36 h-36 bg-background/80 backdrop-blur-3xl border border-border/50 rounded-[28px] flex flex-col items-center justify-center gap-3 mb-10 shadow-xl dark:shadow-2xl pointer-events-auto hover:bg-background transition-colors relative overflow-hidden hidden sm:flex">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-10 mix-blend-soft-light" />
               <FileText className="w-8 h-8 text-foreground relative z-10" />
               <span className="text-sm font-medium text-foreground relative z-10 flex items-center gap-1">New Brief <div className="w-1.5 h-1.5 rounded-full bg-red-500" /></span>
            </motion.div>

            {/* Middle Card 2 (Meeting) */}
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }} className="w-56 h-32 bg-muted/60 backdrop-blur-3xl border border-border/50 rounded-3xl flex flex-col items-center justify-center gap-3 mb-20 shadow-xl dark:shadow-2xl pointer-events-auto relative overflow-hidden hidden sm:flex">
               <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent" />
               <div className="absolute top-3 right-3 text-muted-foreground text-xl leading-none tracking-widest">...</div>
               <div className="bg-foreground/10 p-2 rounded-xl mb-1 backdrop-blur-md">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-90">
                    <path d="M4 6h10c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2zm12 2l4-4v12l-4-4V8z" />
                 </svg>
               </div>
               <span className="font-medium text-foreground text-[15px]">Meeting on 1:00 PM</span>
            </motion.div>

            {/* Right Card: UI Mockup */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 3 }} className="w-80 h-52 bg-background/60 backdrop-blur-2xl border border-border/50 rounded-3xl p-5 shadow-xl dark:shadow-2xl relative overflow-hidden pointer-events-auto flex flex-col mb-2 hidden lg:flex">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-10 mix-blend-soft-light" />
               <div className="relative z-10 flex-1 w-full bg-muted/50 rounded-xl border border-border/30 p-3 flex flex-col gap-3">
                  <div className="flex gap-2 w-full">
                    <div className="w-24 h-16 bg-muted rounded-lg relative overflow-hidden">
                       <div className="absolute -left-1 top-2 bg-orange-500/90 text-[8px] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1 h-1 bg-white rounded-full"></span> Sean
                       </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                       <div className="w-full h-4 bg-muted rounded" />
                       <div className="w-3/4 h-3 bg-muted rounded" />
                       <div className="w-1/2 h-3 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2 w-full h-12 mt-auto">
                    <div className="flex-1 bg-muted rounded-lg" />
                    <div className="w-20 bg-muted rounded-lg relative flex items-center justify-center">
                       <div className="absolute right-[-5px] top-2 bg-[#5b61f4] text-[8px] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1 h-1 bg-white rounded-full"></span> Me
                       </div>
                    </div>
                  </div>
               </div>
               <div className="relative z-10 mt-4 flex justify-between w-full text-xs text-muted-foreground font-medium">
                  <span>UI/UX</span>
                  <span className="text-muted-foreground/70">Edited Now</span>
               </div>
            </motion.div>
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
              {[
                { id: 1, name: "Clean Invoice", img: "/templates/template-1.jpg" },
                { id: 2, name: "Dark Proposal", img: "/templates/template-2.jpg" },
                { id: 3, name: "Creative Quote", img: "/templates/template-3.jpg" },
                { id: 4, name: "Elegant Contract", img: "/templates/template-4.jpg" }
              ].map((template) => (
                <div key={template.id} className="aspect-[1/1.4] bg-muted/50 border border-border rounded-xl p-3 flex flex-col hover:border-primary/50 transition-colors shadow-sm group">
                  <div className="flex-1 bg-background rounded-lg border border-border/50 shadow-sm relative overflow-hidden">
                     <img src={template.img} alt={template.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                     {/* Hover overlay */}
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                       <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 border-none shadow-xl text-foreground bg-background hover:bg-muted">
                         Preview
                       </Button>
                     </div>
                  </div>
                  <p className="text-sm font-medium mt-3 text-center">{template.name}</p>
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
                <Button className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:opacity-90 text-white border-0" size="lg">Start Pro</Button>
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
              <Button size="lg" className="px-10 h-14 text-lg rounded-full shadow-xl hover:shadow-primary/25 transition-all hover:scale-105 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white hover:opacity-90 border-0">
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
