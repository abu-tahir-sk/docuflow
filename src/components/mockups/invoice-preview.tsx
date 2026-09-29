"use client"

import { Card } from "@/components/ui/card"

export function InvoicePreviewMockup() {
  return (
    <Card className="w-full max-w-[400px] mx-auto bg-card shadow-2xl overflow-hidden border-border/40 font-mono text-sm relative group transition-all duration-300 hover:shadow-primary/10">
      <div className="h-2 w-full bg-primary" />
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground font-sans">DOCUFLOW</h3>
            <p className="text-xs text-muted-foreground mt-1">Invoice #INV-2026-001</p>
          </div>
          <div className="text-right">
            <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold font-sans">
              PAID
            </div>
          </div>
        </div>

        <div className="space-y-1 py-4 border-y border-border/50">
          <p className="text-xs text-muted-foreground">Bill To:</p>
          <p className="font-semibold text-foreground font-sans">ABC Technologies</p>
          <p className="text-xs text-muted-foreground">Kolkata, India</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-muted-foreground text-xs border-b border-border/30 pb-2">
            <span>Description</span>
            <span>Amount</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-sans">Website Development</span>
            <span>₹40,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-sans">Hosting & Domain</span>
            <span>₹5,000</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground text-xs">
            <span>Subtotal</span>
            <span>₹45,000</span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground text-xs">
            <span>Tax (18% GST)</span>
            <span>₹8,100</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-border/50 font-sans">
            <span>Total</span>
            <span>₹53,100</span>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <div className="text-center">
            <div className="w-24 h-px bg-border mb-1" />
            <p className="text-[10px] text-muted-foreground font-sans italic">Authorized Signature</p>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/5 pointer-events-none" />
    </Card>
  )
}
