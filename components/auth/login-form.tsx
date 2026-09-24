"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./password-input"
import { GoogleButton } from "./google-button"
import { AuthDivider } from "./auth-divider"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  code: z.string().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  })

  async function handleSendOtp(email: string, password: string) {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/login-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("OTP sent to your email!")
        setShowTwoFactor(true)
      } else {
        toast.error(data.error || "Failed to send OTP.")
      }
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    if (showTwoFactor) {
      if (!data.code) {
        toast.error("Please enter the 2FA code")
        setIsLoading(false)
        return
      }

      try {
        const response = await signIn("credentials", {
          email: data.email,
          password: data.password,
          code: data.code,
          redirect: false,
        })

        if (response?.error) {
          if (response.error === "2FA_REQUIRED") {
            toast.error("Please request a new OTP.")
          } else {
            toast.error(response.error === "CredentialsSignin" ? "Invalid code." : response.error)
          }
          setIsLoading(false)
        } else if (response?.ok) {
          toast.success("Welcome back!")
          router.push("/dashboard")
          router.refresh()
          // Intentionally keeping isLoading = true here so the spinner stays visible during redirection
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.")
        setIsLoading(false)
      }
    } else {
      // Step 1: Send OTP instead of signing in directly
      await handleSendOtp(data.email, data.password)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground mt-2">
          {showTwoFactor ? "We've sent a 2FA code to your email." : "Sign in to your DocuFlow account to continue."}
        </p>
      </div>

      {!showTwoFactor && (
        <>
          <GoogleButton mode="login" />
          <AuthDivider />
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!showTwoFactor && (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("email")}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isLoading}
                {...register("password")}
                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </>
        )}

        {showTwoFactor && (
          <div className="space-y-2">
            <Label htmlFor="code">Two-Factor Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="123456"
              disabled={isLoading}
              {...register("code")}
              className={errors.code ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code.message}</p>
            )}
            
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => handleSendOtp(getValues("email"), getValues("password"))}
                disabled={isLoading}
              >
                Resend code
              </button>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {showTwoFactor ? "Verifying..." : "Signing in..."}
            </>
          ) : (
             showTwoFactor ? "Verify Code" : "Sign In"
          )}
        </Button>
      </form>

      {!showTwoFactor && (
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Don&apos;t have an account? </span>
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Create an account
          </Link>
        </div>
      )}
    </div>
  )
}
