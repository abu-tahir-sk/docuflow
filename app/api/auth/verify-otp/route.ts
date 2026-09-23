import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: otp,
      },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      )
    }

    if (new Date() > verificationToken.expires) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token: otp,
          }
        }
      })
      return NextResponse.json(
        { message: "OTP has expired" },
        { status: 400 }
      )
    }

    // Update user to be verified
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
      },
    })

    // Delete token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: otp,
        }
      }
    })

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json(
      { message: "An error occurred during verification" },
      { status: 500 }
    )
  }
}
