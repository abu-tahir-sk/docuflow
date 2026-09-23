"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, FileText, UserPlus, Bell } from "lucide-react"

export function NotificationCenterMockup() {
  const notifications = [
    { icon: CheckCircle2, title: "Invoice #1024 Paid", time: "2 mins ago", desc: "₹45,000 received from Nova Studio", color: "text-green-500", bg: "bg-green-500/10" },
    { icon: FileText, title: "Quotation Accepted", time: "1 hour ago", desc: "PixelCraft approved the website design quote", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: AlertCircle, title: "Invoice #998 Overdue", time: "3 hours ago", desc: "Payment of ₹12,000 is pending for 3 days", color: "text-red-500", bg: "bg-red-500/10" },
    { icon: UserPlus, title: "New Client Added", time: "Yesterday", desc: "Sarah added 'Vertex Labs' to CRM", color: "text-purple-500", bg: "bg-purple-500/10" },
  ]

  return (
    <Card className="w-full max-w-sm mx-auto shadow-2xl border-border/50 bg-background/80 backdrop-blur-xl overflow-hidden relative mt-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px] pointer-events-none" />
      
      {/* Fake Header trigger */}
      <div className="absolute -top-12 right-4 flex items-center justify-center w-10 h-10 bg-background border border-border/50 rounded-full shadow-lg">
        <Bell className="w-5 h-5 text-foreground" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-background" />
      </div>

      <CardContent className="p-0">
        <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
          <h3 className="font-semibold text-sm">Notifications</h3>
          <span className="text-xs text-primary font-medium cursor-pointer">Mark all as read</span>
        </div>
        
        <div className="flex flex-col divide-y divide-border/30 max-h-[350px] overflow-y-auto">
          {notifications.map((notif, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 hover:bg-muted/30 transition-colors flex gap-3 cursor-pointer"
            >
              <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg}`}>
                <notif.icon className={`w-4 h-4 ${notif.color}`} />
              </div>
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div className="text-sm font-medium leading-none">{notif.title}</div>
                  <div className="text-[10px] text-muted-foreground whitespace-nowrap">{notif.time}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">{notif.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="p-3 border-t border-border/50 text-center bg-muted/10">
          <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">View all activity</span>
        </div>
      </CardContent>
    </Card>
  )
}
