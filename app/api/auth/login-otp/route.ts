import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Please verify your email address before logging in" },
        { status: 401 }
      );
    }

    const existingToken = await prisma.twoFactorToken.findFirst({
      where: { email: user.email! }
    });

    if (existingToken) {
      const timeRemaining = existingToken.expires.getTime() - Date.now();
      // Token expires in 15 mins. If remaining is > 14 mins, it was created < 1 min ago
      if (timeRemaining > 14 * 60 * 1000) {
        return NextResponse.json(
          { error: "Please wait 1 minute before requesting another OTP." },
          { status: 429 } // Too Many Requests
        );
      }
    }

    const twoFactorToken = await generateTwoFactorToken(user.email!);
    await sendVerificationEmail(
      twoFactorToken.email,
      twoFactorToken.token
    );

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("Login OTP error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
