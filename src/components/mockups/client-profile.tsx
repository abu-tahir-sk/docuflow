"use client"

import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Building, FileText, CheckCircle2, Clock } from "lucide-react"

export function ClientProfileMockup() {
  return (
    <Card className="w-full max-w-lg mx-auto bg-card shadow-xl overflow-hidden border-border/40">
      {/* Header Profile */}
      <div className="bg-muted/30 p-6 flex items-start gap-4 border-b border-border/50">
        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
          <Building className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold">ABC Technologies</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> contact@abctech.com</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +91 98765 43210</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Sector V, Kolkata</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-border/50 border-b border-border/50">
        <div className="p-4 text-center bg-background/50">
          <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
          <p className="font-bold text-green-600 dark:text-green-400">₹1.25L</p>
        </div>
        <div className="p-4 text-center bg-background/50">
          <p className="text-xs text-muted-foreground mb-1">Invoices</p>
          <p className="font-bold">24</p>
        </div>
        <div className="p-4 text-center bg-background/50">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="font-bold text-orange-600 dark:text-orange-400">₹18K</p>
        </div>
      </div>

      {/* Recent History */}
      <div className="p-6">
        <h4 className="text-sm font-semibold mb-4">Recent History</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full"><FileText className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-sm font-medium">Invoice #INV-202</p>
                <p className="text-xs text-muted-foreground">Sent today</p>
              </div>
            </div>
            <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2 py-1 rounded-md flex items-center gap-1">
              <Clock className="h-3 w-3" /> Pending
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full"><FileText className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-sm font-medium">Invoice #INV-201</p>
                <p className="text-xs text-muted-foreground">Aug 15, 2026</p>
              </div>
            </div>
            <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-md flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Paid
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
