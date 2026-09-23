"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, TrendingUp, Users } from "lucide-react"

export function AuthBrandPanel() {
  return (
    <div className="flex h-full flex-col justify-between p-12 lg:p-16 xl:p-20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-3xl opacity-50 dark:opacity-20" />
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-3xl opacity-50 dark:opacity-20" />
      </div>

      <div className="z-10">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">DocuFlow</span>
        </Link>
        <div className="max-w-md">
          <h1 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl text-foreground">
            Business documents, <br />
            <span className="text-primary">simplified.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Everything your business needs to manage documents, invoices, clients and payments — in one place.
          </p>
        </div>
      </div>

      {/* Floating Mockups Area */}
      <div className="relative mt-16 flex-1 w-full max-w-lg mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute right-10 top-0 w-64 rounded-xl border bg-card p-4 shadow-xl shadow-black/5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Invoice Paid</p>
              <p className="text-xl font-bold">$2,450.00</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute left-0 top-24 w-64 rounded-xl border bg-card p-4 shadow-xl shadow-black/5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Payment Received</p>
              <p className="text-xl font-bold">+$5,200</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute right-0 top-48 w-56 rounded-xl border bg-card p-4 shadow-xl shadow-black/5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">12 New Clients</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
