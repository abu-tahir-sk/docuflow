"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { siteConfig } from "@/config/site"
import { MobileNav } from "./mobile-nav"

import Image from "next/image"
import logoImage from "@/public/logo-v3.jpg"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-8">
        <MobileNav />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={logoImage} alt="DocuFlow Logo" width={40} height={40} className="rounded-md" />
            <span className="hidden font-bold sm:inline-block text-xl">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <div className="hidden md:flex space-x-2 mr-2">
              <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
                Login
              </Link>
              <Link href="/register" className={buttonVariants({ variant: "default" })}>
                Start for Free
              </Link>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
