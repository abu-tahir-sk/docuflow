import {
  LayoutDashboard,
  FileText,
  FileSpreadsheet,
  FileSignature,
  Handshake,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-react"

export const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    icon: FileSpreadsheet,
  },
  {
    title: "Quotations",
    href: "/dashboard/quotations",
    icon: FileSignature,
  },
  {
    title: "Agreements",
    href: "/dashboard/agreements",
    icon: Handshake,
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
]
