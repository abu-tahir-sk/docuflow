import { ReactNode } from "react"
import { AuthBrandPanel } from "./auth-brand-panel"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background">
      {/* Left Marketing Panel - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col relative bg-muted/30 border-r">
        <AuthBrandPanel />
      </div>
      
      {/* Right Auth Panel */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {children}
        </div>
      </div>
    </div>
  )
}
