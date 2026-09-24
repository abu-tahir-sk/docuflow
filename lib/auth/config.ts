import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any, // Type coercion due to NextAuth vs Auth.js types
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code: { label: "2FA Code", type: "text", optional: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.passwordHash) {
          throw new Error("Invalid credentials")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email address before logging in")
        }

        if (credentials.code) {
          const twoFactorToken = await prisma.twoFactorToken.findFirst({
            where: { email: user.email! }
          });

          if (!twoFactorToken) {
            throw new Error("Invalid code");
          }

          if (twoFactorToken.token !== credentials.code) {
            throw new Error("Invalid code");
          }

          const hasExpired = new Date(twoFactorToken.expires) < new Date();

          if (hasExpired) {
            throw new Error("Code expired");
          }

          await prisma.twoFactorToken.delete({
            where: { id: twoFactorToken.id }
          });

          const existingConfirmation = await prisma.twoFactorConfirmation.findUnique({
            where: { userId: user.id }
          });

          if (existingConfirmation) {
            await prisma.twoFactorConfirmation.delete({
              where: { id: existingConfirmation.id }
            });
          }

          await prisma.twoFactorConfirmation.create({
            data: { userId: user.id }
          });
        } else {
          // Check if email was verified recently (e.g. within the last 5 minutes)
          // If so, we bypass 2FA to allow automatic login after registration.
          const isRecentlyVerified = user.emailVerified && (Date.now() - user.emailVerified.getTime() < 5 * 60 * 1000);
          
          if (!isRecentlyVerified) {
            // No code provided, but valid credentials, and not recently verified.
            // The client will catch this specific error and show the OTP field.
            throw new Error("2FA_REQUIRED");
          }
        }

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        // Add additional user properties to token if needed
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
