"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Palette, Image as ImageIcon, Type, FileStack, LayoutTemplate } from "lucide-react"

export function CustomizationPanelMockup() {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden relative flex flex-col md:flex-row">
      <div className="absolute top-0 right-1/2 w-64 h-64 bg-pink-500/10 blur-[100px] pointer-events-none" />
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-48 bg-muted/30 border-r border-border/50 p-4 space-y-2 flex flex-row md:flex-col overflow-x-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 hidden md:block px-2">Settings</div>
        {[
          { name: "Brand & Colors", icon: Palette, active: true },
          { name: "Typography", icon: Type, active: false },
          { name: "Company Logo", icon: ImageIcon, active: false },
          { name: "Templates", icon: LayoutTemplate, active: false },
          { name: "Invoice Details", icon: FileStack, active: false }
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors whitespace-nowrap ${item.active ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
            <item.icon className="w-4 h-4 shrink-0" /> {item.name}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <CardContent className="flex-1 p-6 relative">
        <h3 className="font-semibold text-lg mb-6">Brand Customization</h3>
        
        <div className="space-y-6">
          {/* Color Picker */}
          <div>
            <div className="text-sm font-medium mb-3">Primary Brand Color</div>
            <div className="flex gap-3">
              {[
                { hex: "#2563EB", ring: "ring-blue-500" },
                { hex: "#7C3AED", ring: "ring-purple-500" },
                { hex: "#EA580C", ring: "ring-orange-500", active: true },
                { hex: "#16A34A", ring: "ring-green-500" },
                { hex: "#000000", ring: "ring-foreground dark:ring-white" }
              ].map((color, i) => (
                <div key={i} className={`w-8 h-8 rounded-full cursor-pointer shadow-sm relative flex items-center justify-center ${color.active ? `ring-2 ring-offset-2 ${color.ring} ring-offset-background` : ''}`} style={{ backgroundColor: color.hex }}>
                  {color.active && <span className="w-2 h-2 bg-white rounded-full mix-blend-difference" />}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                <span className="text-xs text-muted-foreground">+</span>
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <div className="text-sm font-medium mb-3">Company Logo</div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border border-border/50 bg-muted/50 flex items-center justify-center overflow-hidden">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                  DF
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="px-3 py-1.5 bg-background border border-border rounded-md text-xs font-medium hover:bg-muted transition-colors shadow-sm">
                  Change Logo
                </button>
                <div className="text-[10px] text-muted-foreground">Recommended: 512x512px (PNG, JPG)</div>
              </div>
            </div>
          </div>

          {/* Document Preview (Mini) */}
          <div>
             <div className="text-sm font-medium mb-3">Live Preview</div>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="w-full h-32 bg-white dark:bg-[#1c1c22] rounded-lg border border-border/50 shadow-inner p-4 relative overflow-hidden"
             >
                {/* Mock Document */}
                <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-500 mb-2 opacity-80" />
                <div className="w-1/3 h-3 bg-muted rounded mb-1" />
                <div className="w-1/4 h-2 bg-muted rounded mb-4" />
                
                <div className="w-full h-1 bg-orange-500/20 rounded mt-auto absolute bottom-4 left-4 right-4 max-w-[calc(100%-2rem)]" />
             </motion.div>
          </div>

        </div>

      </CardContent>
    </Card>
  )
}
