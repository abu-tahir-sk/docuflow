import { Metadata } from "next"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Forgot Password | DocuFlow",
  description: "Reset your DocuFlow password.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full text-center">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Reset Password</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
        
        {/* Placeholder form area */}
        <div className="space-y-4 mb-6">
          <p className="text-sm border rounded-md p-4 bg-muted/50 text-muted-foreground text-left">
            This functionality is not fully implemented in this demo, but the navigation is prepared.
          </p>
          <Button disabled className="w-full">Send reset link</Button>
        </div>

        <Link
          href="/login"
          className="text-sm font-medium text-primary hover:underline"
        >
          Back to login
        </Link>
      </div>
    </AuthLayout>
  )
}
