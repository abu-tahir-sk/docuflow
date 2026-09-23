"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { PenTool, Check, FileText, User, Calendar, ShieldCheck } from "lucide-react"

export function DigitalSignatureMockup() {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] pointer-events-none" />
      
      <CardContent className="p-0">
        <div className="bg-muted/30 p-4 border-b border-border/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-500/10 rounded-md">
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-semibold">Service_Agreement_v2.pdf</div>
              <div className="text-xs text-muted-foreground">3 pages • Needs your signature</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="border-2 border-dashed border-border rounded-xl p-6 bg-muted/20 relative flex flex-col items-center justify-center min-h-[160px] cursor-crosshair group">
            
            <motion.div 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              <svg width="200" height="80" viewBox="0 0 200 80" className="text-foreground/80 stroke-current" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20,60 Q40,20 60,50 T100,40 T140,50 T180,30" />
              </svg>
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              <PenTool className="w-8 h-8 text-muted-foreground mb-2" />
              <div className="text-sm font-medium text-muted-foreground">Sign Here</div>
            </div>

            <div className="absolute bottom-2 left-4 right-4 flex justify-between items-end border-t border-border/50 pt-2 opacity-50">
              <div className="text-[10px] text-muted-foreground font-mono">X ___________________</div>
              <div className="text-[10px] text-muted-foreground font-mono">Date: 23-Sep-2026</div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex gap-4 text-sm">
              <div className="flex-1 bg-muted/50 rounded-lg p-3 border border-border/50">
                <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><User className="w-3 h-3"/> Signer Name</div>
                <div className="font-medium">Rahim Ahmed</div>
              </div>
              <div className="flex-1 bg-muted/50 rounded-lg p-3 border border-border/50">
                <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Calendar className="w-3 h-3"/> Date</div>
                <div className="font-medium">23 Sep 2026</div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <Check className="w-4 h-4" /> Apply Signature
            </motion.button>
            
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              Secure, legally binding e-signature
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
