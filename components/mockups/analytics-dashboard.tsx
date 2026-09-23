"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react"

export function AnalyticsDashboardMockup() {
  return (
    <div className="w-full p-4 md:p-6 bg-card rounded-2xl border border-border shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Revenue Overview</h3>
        <select className="bg-muted text-xs px-2 py-1 rounded-md border-0 outline-none">
          <option>This Year</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 border-border/50 shadow-sm bg-background/50">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-muted-foreground">মোট আয়</p>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <h4 className="text-xl font-bold">₹4,82,500</h4>
        </Card>
        <Card className="p-4 border-border/50 shadow-sm bg-background/50">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-muted-foreground">Paid</p>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <h4 className="text-xl font-bold text-green-600 dark:text-green-400">₹3,95,000</h4>
        </Card>
        <Card className="p-4 border-border/50 shadow-sm bg-background/50">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-muted-foreground">Pending</p>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </div>
          <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400">₹87,500</h4>
        </Card>
        <Card className="p-4 border-border/50 shadow-sm bg-background/50">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-muted-foreground">Clients</p>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <h4 className="text-xl font-bold">24</h4>
        </Card>
      </div>

      {/* Fake Bar Chart */}
      <div className="h-48 w-full flex items-end gap-2 px-2 mt-4">
        {[40, 60, 30, 80, 50, 90, 70, 100, 60, 40, 85, 75].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end group">
            <div 
              className={`w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80 ${i === 7 ? 'bg-primary' : 'bg-primary/20'}`} 
              style={{ height: `${height}%` }}
            />
            <span className="text-[8px] text-muted-foreground text-center mt-2">
              {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
