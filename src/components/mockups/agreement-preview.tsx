"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function AgreementPreviewMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Background document for depth */}
      <div className="absolute inset-0 bg-background border border-border shadow-md rounded-lg translate-y-4 translate-x-4 -z-10 opacity-50" />
      <div className="absolute inset-0 bg-background border border-border shadow-md rounded-lg translate-y-2 translate-x-2 -z-10 opacity-75" />
      
      {/* Main Document */}
      <Card className="bg-card shadow-2xl rounded-lg border-border p-8 font-serif relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
        <div className="text-center mb-8 border-b border-border/50 pb-6">
          <h2 className="text-xl font-bold mb-2">SERVICE AGREEMENT</h2>
          <p className="text-xs text-muted-foreground font-sans">Effective Date: October 1, 2026</p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-foreground/80 mb-8">
          <p>
            This Service Agreement ("Agreement") is made between <strong>DocuFlow Studio</strong> ("Provider") and <strong>ABC Technologies</strong> ("Client").
          </p>
          <div className="space-y-2">
            <div className="h-2 w-full bg-muted rounded" />
            <div className="h-2 w-5/6 bg-muted rounded" />
            <div className="h-2 w-4/6 bg-muted rounded" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-2 w-full bg-muted rounded" />
            <div className="h-2 w-3/4 bg-muted rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-12 pt-6 border-t border-border/50 font-sans">
          <div>
            <p className="text-xs text-muted-foreground mb-4">For Provider:</p>
            {/* Signature UI overlay */}
            <div className="relative">
              <span className="font-[cursive] text-2xl text-primary absolute bottom-1 left-0 -rotate-6">Abu Tahir</span>
              <div className="w-full h-px bg-border mt-8" />
            </div>
            <p className="text-[10px] mt-1">Authorized Signatory</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-4">For Client:</p>
            <div className="relative">
              {/* Interactive looking signature box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-primary/5 border border-primary/20 border-dashed rounded-md flex items-center justify-center backdrop-blur-[1px]"
              >
                <span className="bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded-sm shadow-sm cursor-pointer hover:bg-primary/90">Sign Here</span>
              </motion.div>
              <div className="w-full h-px bg-border mt-8" />
            </div>
            <p className="text-[10px] mt-1">Authorized Signatory</p>
          </div>
        </div>
        
        {/* Verification badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500/10 text-green-600 px-2 py-1 rounded-full border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] font-bold tracking-wider uppercase font-sans">Verified</span>
        </div>
      </Card>
    </div>
  )
}
