import { ReactNode } from "react"
import { AuthBrandPanel } from "./auth-brand-panel"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background/95 dark:bg-background relative overflow-hidden">
      {/* Background gradients for the main container */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* Left Marketing Panel - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col relative border-r border-border/50 bg-muted/20 backdrop-blur-3xl shadow-2xl">
        <AuthBrandPanel />
      </div>
      
      {/* Right Auth Panel */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Glassmorphic Card Wrapper */}
          <div className="relative group rounded-3xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-black/40 px-8 py-10 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/40 to-white/10 dark:from-white/5 dark:to-transparent opacity-50 pointer-events-none -z-10" />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
