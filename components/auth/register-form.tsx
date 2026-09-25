"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./password-input"
import { PasswordStrength } from "./password-strength"
import { GoogleButton } from "./google-button"
import { AuthDivider } from "./auth-divider"

const registerSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[a-z]/, "Password must contain one lowercase letter")
    .regex(/[0-9]/, "Password must contain one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // OTP States
  const [isOtpMode, setIsOtpMode] = useState(false)
  const [otp, setOtp] = useState("")
  const [registeredEmail, setRegisteredEmail] = useState("")
  const [registeredPassword, setRegisteredPassword] = useState("")
  const [photoBase64, setPhotoBase64] = useState<string | null>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be less than 2MB")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const passwordValue = watch("password")

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          image: photoBase64,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to register")
      }

      const responseData = await response.json()

      if (responseData.requireOtp) {
        setRegisteredEmail(data.email)
        setRegisteredPassword(data.password)
        setIsOtpMode(true)
        
        if (responseData.otp) {
          console.log("=========================================")
          console.log(`DEV MODE OTP: ${responseData.otp}`)
          console.log("=========================================")
          toast.success(`OTP for dev testing: ${responseData.otp}`)
        } else {
          toast.success("OTP sent to your email (check console)")
        }
        
        setIsLoading(false)
        return
      }

      // Legacy fallback if no OTP required
      await signInWithCredentials(data.email, data.password)

    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registeredEmail,
          otp,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Invalid OTP")
      }

      toast.success("Email verified successfully!")
      await signInWithCredentials(registeredEmail, registeredPassword)
    } catch (error: any) {
      toast.error(error.message || "Invalid or expired OTP")
      setIsLoading(false)
    }
  }

  async function signInWithCredentials(email: string, password: string) {
    const signInResponse = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })

    if (signInResponse?.error) {
      toast.error("Account verified, but couldn't sign in automatically.")
      router.push("/login")
    } else {
      setIsSuccess(true)
      
      // Wait a moment so user can see success state before redirect
      setTimeout(() => {
        router.push("/dashboard")
        router.refresh()
      }, 1500)
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full text-center py-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Account Created!</h2>
        <p className="text-sm text-muted-foreground mt-2 mb-8">
          Welcome to DocuFlow. Redirecting you to the dashboard...
        </p>
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (isOtpMode) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Verify your email</h2>
          <p className="text-sm text-muted-foreground mt-2">
            We've sent a 6-digit code to <span className="font-medium text-foreground">{registeredEmail}</span>
          </p>
        </div>
        
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password (OTP)</Label>
            <Input
              id="otp"
              placeholder="123456"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              disabled={isLoading}
              className="text-center text-2xl tracking-widest h-14"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
          
          <div className="text-center text-sm">
            <button 
              type="button" 
              onClick={() => setIsOtpMode(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to registration
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Create your account</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Start managing your business documents with DocuFlow.
        </p>
      </div>

      <GoogleButton mode="register" />
      
      <AuthDivider />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            disabled={isLoading}
            {...register("name")}
            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo">Profile Photo (Optional)</Label>
          <div className="flex items-center gap-4">
            {photoBase64 ? (
              <img src={photoBase64} alt="Profile preview" className="w-12 h-12 rounded-full object-cover border" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border">
                <Upload className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={isLoading}
              className="flex-1 cursor-pointer"
            />
          </div>
        </div>

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
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            disabled={isLoading}
            {...register("password")}
            className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          <PasswordStrength password={passwordValue} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm your password"
            autoComplete="new-password"
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
              Sending OTP...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
