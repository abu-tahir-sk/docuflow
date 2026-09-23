"use client"

import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password?: string
}

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  const criteria = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  ]

  if (!password) {
    return null
  }

  const passedCount = criteria.filter((c) => c.test(password)).length
  
  // Progress bar calculation
  const strengthPercentage = (passedCount / criteria.length) * 100
  let barColor = "bg-red-500"
  if (passedCount === 3) barColor = "bg-amber-500"
  if (passedCount === 4) barColor = "bg-emerald-500"

  return (
    <div className="mt-2 space-y-3">
      {/* Strength Bar */}
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-300", barColor)}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>
      
      {/* Criteria Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {criteria.map((criterion, i) => {
          const isMet = criterion.test(password)
          return (
            <div 
              key={i} 
              className={cn(
                "flex items-center text-xs space-x-1.5 transition-colors duration-200",
                isMet ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
              )}
            >
              {isMet ? (
                <Check className="h-3 w-3 flex-shrink-0" />
              ) : (
                <X className="h-3 w-3 flex-shrink-0 opacity-50" />
              )}
              <span>{criterion.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
