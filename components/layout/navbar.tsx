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
    <header className="fixed top-6 z-50 w-full flex justify-center pointer-events-none">
      <div className="container px-4 flex justify-center w-full max-w-4xl">
        <div className="flex items-center justify-between px-2 py-2 bg-background/60 dark:bg-[#12121a]/60 backdrop-blur-xl border border-border/50 dark:border-white/10 rounded-full w-full shadow-lg dark:shadow-2xl pointer-events-auto transition-colors duration-300">
          
          {/* Left: Logo & Links */}
          <div className="flex items-center pl-1">
            <div className="md:hidden mr-2">
              <MobileNav />
            </div>
            
            {/* Logo Icon */}
            <Link href="/" className="bg-[#5b61f4] hover:bg-[#4f54d4] transition-colors rounded-full w-9 h-9 flex items-center justify-center mr-6 shadow-[0_0_15px_rgba(91,97,244,0.5)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center space-x-6 text-[14px] font-sans font-medium text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="/why-us" className="hover:text-foreground transition-colors">Why us</Link>
              <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link href="/login" className="hover:text-foreground transition-colors">Log in</Link>
            </nav>
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Link href="/register" className="bg-foreground hover:bg-foreground/90 text-background px-6 py-2 rounded-full text-[14px] font-semibold transition-colors">
              Sign up
            </Link>
          </div>
          
        </div>
      </div>
    </header>
  )
}
