"use client"

import Link from "next/link"
import { FileText, ArrowRightLeft, Globe } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { siteConfig } from "@/config/site"
import { MobileNav } from "./mobile-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent pt-6">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-14">
        
        {/* Left: Logo */}
        <div className="flex items-center lg:w-1/4">
          <div className="md:hidden mr-2">
            <MobileNav />
          </div>
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600">
              A
            </div>
            <span className="font-semibold sm:inline-block text-[22px] tracking-tight text-foreground">
              DocuFlow
            </span>
          </Link>
        </div>
        
        {/* Center: Desktop Links */}
        <div className="hidden md:flex justify-center flex-1">
          <nav className="flex items-center space-x-8 text-[15px] font-medium">
            <Link href="/features" className="flex items-center gap-1.5 transition-colors hover:text-foreground text-foreground/70">
              Features <span className="text-[9px] opacity-60">▼</span>
            </Link>
            <Link href="/solutions" className="flex items-center gap-1.5 transition-colors hover:text-foreground text-foreground/70">
              Solutions <span className="text-[9px] opacity-60">▼</span>
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground text-foreground/70">
              Pricing
            </Link>
            <Link href="/docs" className="transition-colors hover:text-foreground text-foreground/70">
              Docs
            </Link>
            <Link href="/resources" className="flex items-center gap-1.5 transition-colors hover:text-foreground text-foreground/70">
              Resources <span className="text-[9px] opacity-60">▼</span>
            </Link>
          </nav>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center justify-end lg:w-1/4 space-x-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center space-x-5 ml-4">
            <Link href="/login" className="text-[15px] font-medium text-foreground/70 hover:text-foreground transition-colors">
              Login
            </Link>
            <Link href="/register" className={buttonVariants({ variant: "default", className: "shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-full px-7 h-10" })}>
              Start Free <span className="ml-2 font-normal text-lg leading-none">→</span>
            </Link>
          </div>
        </div>
        
      </div>
    </header>
  )
}
