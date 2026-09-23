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
    <header className="absolute top-0 z-50 w-full bg-transparent transition-all duration-300 pt-4">
      <div className="container flex h-14 items-center justify-between mx-auto px-4 md:px-8 max-w-7xl">
        <MobileNav />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-blue-600">
              A
            </div>
            <span className="font-bold sm:inline-block text-xl tracking-tight text-white">
              DocuFlow
            </span>
          </Link>
        </div>
        
        {/* Desktop Links (Centered) */}
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex items-center space-x-8 text-sm font-medium">
            <Link href="/features" className="flex items-center gap-1 transition-colors hover:text-white text-gray-300">
              Features <span className="text-[10px] opacity-70">▼</span>
            </Link>
            <Link href="/solutions" className="flex items-center gap-1 transition-colors hover:text-white text-gray-300">
              Solutions <span className="text-[10px] opacity-70">▼</span>
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-white text-gray-300">
              Pricing
            </Link>
            <Link href="/docs" className="transition-colors hover:text-white text-gray-300">
              Docs
            </Link>
            <Link href="/resources" className="flex items-center gap-1 transition-colors hover:text-white text-gray-300">
              Resources <span className="text-[10px] opacity-70">▼</span>
            </Link>
          </nav>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center justify-end">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-6 ml-4">
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/register" className={buttonVariants({ variant: "default", className: "shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-full px-6 py-1 h-9" })}>
                Start Free <span className="ml-2">→</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
