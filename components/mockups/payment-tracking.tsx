"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PaymentTrackingMockup() {
  return (
    <Card className="w-full max-w-xl mx-auto shadow-2xl border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden relative">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 dark:bg-green-500/20 blur-[100px] pointer-events-none" />

      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Financial Overview 
            </h3>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </div>
          <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 flex gap-1.5 items-center">
            <CreditCard className="w-3.5 h-3.5" />
            Stripe Connected
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3"/> Total Revenue</div>
            <div className="text-xl font-bold">₹1,24,500</div>
            <div className="text-xs text-green-500 flex items-center mt-1"><ArrowUpRight className="w-3 h-3 mr-0.5"/> +12.5%</div>
          </div>
          <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
            <div className="text-xs text-green-600/70 dark:text-green-400/70 mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Paid</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">₹96,000</div>
          </div>
          <div className="bg-orange-500/5 rounded-xl p-4 border border-orange-500/20">
            <div className="text-xs text-orange-600/70 dark:text-orange-400/70 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Pending</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">₹28,500</div>
          </div>
        </div>

        {/* Recent Payments List */}
        <div>
          <div className="text-sm font-medium mb-3">Recent Transactions</div>
          <div className="space-y-3">
            {[
              { client: "Nova Studio", amount: "₹45,000", status: "Paid", date: "Today, 10:24 AM", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
              { client: "PixelCraft", amount: "₹12,500", status: "Pending", date: "Due in 2 days", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
              { client: "TechFlow", amount: "₹16,000", status: "Overdue", date: "Due 3 days ago", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
            ].map((tx, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${tx.bg}`}>
                    <tx.icon className={`w-4 h-4 ${tx.color}`} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{tx.client}</div>
                    <div className="text-xs text-muted-foreground">{tx.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{tx.amount}</div>
                  <div className={`text-[10px] uppercase font-bold tracking-wider ${tx.color}`}>{tx.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
