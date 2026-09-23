"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import Image from "next/image"
import logoImage from "@/public/logo-v3.jpg"
import { SIDEBAR_ITEMS } from "@/lib/constants"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          />
        }
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center space-x-2"
          onOpenChange={setOpen}
        >
          <Image src={logoImage} alt="DocuFlow Logo" width={36} height={36} className="rounded-md" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col space-y-3 mt-6">
          <MobileLink href="/features" onOpenChange={setOpen}>Features</MobileLink>
          <MobileLink href="/how-it-works" onOpenChange={setOpen}>How it works</MobileLink>
          <MobileLink href="/pricing" onOpenChange={setOpen}>Pricing</MobileLink>
          <MobileLink href="/faq" onOpenChange={setOpen}>FAQ</MobileLink>
        </div>
        <div className="mt-6 border-t pt-4">
          <h4 className="mb-2 font-medium text-sm text-muted-foreground">Dashboard Menu</h4>
          <div className="flex flex-col space-y-2">
            {SIDEBAR_ITEMS.map((item) => (
              <MobileLink key={item.href} href={item.href} onOpenChange={setOpen} className="flex items-center gap-2 py-1">
                <item.icon className="h-4 w-4" />
                {item.title}
              </MobileLink>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
