"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FilePlus, FileText, Send, Bell, DollarSign, ArrowRight } from "lucide-react"

export function AutomationWorkflowMockup() {
  const steps = [
    { icon: FilePlus, title: "Invoice Created", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: FileText, title: "Auto Generate PDF", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: Send, title: "Email to Client", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: Bell, title: "Payment Reminder", color: "text-red-500", bg: "bg-red-500/10" },
    { icon: DollarSign, title: "Payment Received", color: "text-green-500", bg: "bg-green-500/10" }
  ]

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/10 dark:bg-orange-500/20 blur-[100px] pointer-events-none" />
      
      <CardContent className="p-8">
        <div className="flex flex-col space-y-4 relative">
          
          {/* Connecting Line */}
          <div className="absolute top-8 bottom-8 left-6 w-0.5 bg-border/50 z-0" />
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            className="absolute top-8 left-6 w-0.5 bg-primary z-0 origin-top"
          />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-4 relative z-10"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-background ${step.bg} shadow-sm relative`}>
                <step.icon className={`w-5 h-5 ${step.color}`} />
                {i < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground absolute -bottom-6 -right-6 hidden sm:block opacity-30 rotate-90 sm:rotate-0" />
                )}
              </div>
              <div className="bg-muted/50 border border-border/50 p-3 rounded-lg flex-1 shadow-sm">
                <div className="font-medium text-sm text-foreground">{step.title}</div>
                <div className="text-xs text-muted-foreground">Automated action</div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
