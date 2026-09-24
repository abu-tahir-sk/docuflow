import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    if (existingUser) {
      if (existingUser.emailVerified) {
        return NextResponse.json(
          { message: "User with this email already exists" },
          { status: 409 }
        )
      } else {
        // Update unverified user
        await prisma.user.update({
          where: { email },
          data: {
            name,
            passwordHash: hashedPassword,
          },
        })
      }
    } else {
      // Create user
      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword,
        },
      })
    }

    // Prevent spam by checking if an OTP was requested less than 1 minute ago
    const existingToken = await prisma.verificationToken.findFirst({
      where: { identifier: email }
    })
    
    if (existingToken) {
      const timeRemaining = existingToken.expires.getTime() - Date.now()
      // If token expires in more than 9 minutes (created < 1 min ago)
      if (timeRemaining > 9 * 60 * 1000) {
        return NextResponse.json(
          { message: "Please wait 1 minute before requesting another OTP." },
          { status: 429 } // Too Many Requests
        )
      }
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Set expiry to 10 minutes from now
    const expires = new Date(Date.now() + 10 * 60 * 1000)

    // Save or update VerificationToken
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: email,
          token: otp,
        },
      },
      update: {
        token: otp,
        expires,
      },
      create: {
        identifier: email,
        token: otp,
        expires,
      },
    })

    // Remove old tokens for this email just in case (optional, but upsert handles uniqueness on identifier_token, 
    // wait, identifier_token is unique, but one email could have multiple tokens. Let's delete old ones first)
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        token: { not: otp }
      }
    })

    // Send actual email using Resend
    await sendVerificationEmail(email, otp)

    return NextResponse.json(
      { 
        requireOtp: true, 
        message: "OTP sent to email",
        // FOR DEVELOPMENT ONLY: send OTP in response so you can see it in the browser
        ...(process.env.NODE_ENV !== "production" ? { otp } : {})
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred during registration" },
      { status: 500 }
    )
  }
}
