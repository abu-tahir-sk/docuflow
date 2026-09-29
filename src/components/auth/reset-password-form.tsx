"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./password-input"

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: ResetPasswordValues) {
    if (!token) {
      toast.error("Missing reset token")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password })
      })

      if (res.ok) {
        setIsSuccess(true)
        toast.success("Password updated successfully!")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        const errorData = await res.json()
        toast.error(errorData.error || "Failed to reset password")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="w-full text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Invalid Link</h2>
          <p className="text-sm text-muted-foreground mt-2">
            This password reset link is invalid or has expired.
          </p>
        </div>
        <Link href="/forgot-password">
          <Button className="w-full">Request new link</Button>
        </Link>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="w-full text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Password Reset</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your password has been successfully updated. Redirecting to login...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Set New Password</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <PasswordInput
            id="password"
            placeholder="Enter new password"
            disabled={isLoading}
            {...register("password")}
            className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm new password"
            disabled={isLoading}
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  )
}
