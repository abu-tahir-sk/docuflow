"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, Settings, HelpCircle, LogOut } from "lucide-react"
import { SIDEBAR_ITEMS } from "@/lib/constants"
import { siteConfig } from "@/config/site"

import Image from "next/image"
import logoImage from "@/public/logo-v3.jpg"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64 lg:w-72">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src={logoImage} alt="DocuFlow Logo" width={40} height={40} className="rounded-md" />
            <span className="">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {SIDEBAR_ITEMS.map((item, index) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-muted hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "")} />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <nav className="grid items-start gap-1 text-sm font-medium">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link
              href="/support"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
            >
              <HelpCircle className="h-4 w-4" />
              Support
            </Link>
            <button
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-destructive cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

