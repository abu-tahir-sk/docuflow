import { Metadata } from "next"
import { Suspense } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Set New Password | DocuFlow",
  description: "Set your new DocuFlow password.",
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  )
}
