"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, Users, DollarSign, ArrowUpRight, CheckCircle2 } from "lucide-react"

export function HeroDashboardMockup() {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 md:mt-20">
      {/* Main Dashboard Window */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 rounded-2xl overflow-hidden border border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl"
      >
        {/* Mac-like Window Header */}
        <div className="h-10 bg-muted/30 border-b border-border/50 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <div className="mx-auto flex items-center justify-center -ml-16 w-full">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <FileText className="h-3 w-3" /> DocuFlow
            </span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex h-[400px] md:h-[480px]">
          {/* Sidebar */}
          <div className="w-16 md:w-48 border-r border-border/50 p-4 hidden sm:flex flex-col gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 mb-4" />
            <div className="h-4 w-full bg-muted/50 rounded-md" />
            <div className="h-4 w-3/4 bg-muted/30 rounded-md" />
            <div className="h-4 w-5/6 bg-muted/30 rounded-md" />
            <div className="h-4 w-2/3 bg-muted/30 rounded-md" />
          </div>

          {/* Main Area */}
          <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-hidden">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold tracking-tight">স্বাগতম, আবু!</h3>
                <p className="text-sm text-muted-foreground">আপনার আজকের ব্যবসার হিসাব</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">মোট আয়</p>
                <h4 className="text-2xl font-bold">₹2.4L</h4>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5%
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Invoices</p>
                <h4 className="text-2xl font-bold">124</h4>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </Card>
              <Card className="p-4 hidden md:block">
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <h4 className="text-2xl font-bold">₹18K</h4>
                <p className="text-xs text-orange-500 mt-1">4 invoices</p>
              </Card>
            </div>

            {/* Chart Area */}
            <div className="flex-1 border border-border/50 rounded-xl bg-card/50 flex items-end relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              {/* Fake Chart Lines */}
              <svg className="w-full h-32 absolute bottom-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L0,80 Q20,60 40,80 T80,40 T100,20 L100,100 Z" fill="currentColor" className="text-primary/10" />
                <path d="M0,80 Q20,60 40,80 T80,40 T100,20" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute -right-4 md:-right-12 top-20 z-20 bg-background/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl flex items-center gap-3"
      >
        <div className="bg-green-500/20 p-2 rounded-full">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">পেমেন্ট গ্রহণ হয়েছে</p>
          <p className="font-bold">₹25,000</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute -left-4 md:-left-8 bottom-1/3 z-20 bg-background/80 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl flex items-center gap-3"
      >
        <div className="bg-primary/20 p-2 rounded-full">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-xs font-bold">Invoice #INV-102</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">Paid <CheckCircle2 className="h-3 w-3 text-green-500" /></p>
        </div>
      </motion.div>
    </div>
  )
}
