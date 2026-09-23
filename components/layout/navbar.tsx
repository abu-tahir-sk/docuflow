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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-8">
        <MobileNav />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
              <ArrowRightLeft className="h-3 w-3 text-primary -ml-2 mt-2" />
            </div>
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
              DocuFlow
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/features" className="transition-colors hover:text-primary text-foreground/70">
              ফিচার
            </Link>
            <Link href="/solutions" className="transition-colors hover:text-primary text-foreground/70">
              সমাধান
            </Link>
            <Link href="/how-it-works" className="transition-colors hover:text-primary text-foreground/70">
              কীভাবে কাজ করে
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-primary text-foreground/70">
              প্রাইসিং
            </Link>
            <Link href="/faq" className="transition-colors hover:text-primary text-foreground/70">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 hidden md:flex gap-1 text-foreground/70">
                <Globe className="h-4 w-4" />
                বাংলা ▾
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>বাংলা</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <div className="hidden md:flex space-x-2 ml-2">
              <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
                লগইন
              </Link>
              <Link href="/register" className={buttonVariants({ variant: "default", className: "shadow-md hover:shadow-lg transition-all" })}>
                ফ্রি শুরু করুন
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
