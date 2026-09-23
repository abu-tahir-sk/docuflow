import { Metadata } from "next"
import { AuthLayout } from "@/components/auth/auth-layout"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | DocuFlow",
  description: "Sign in to your DocuFlow account.",
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
