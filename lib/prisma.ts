// Mock PrismaClient to prevent module not found errors during UI testing
// This is a temporary bypass because the Prisma client generation is failing.

export const prisma = {
  user: {
    findUnique: async () => null,
    create: async () => ({}),
  },
  account: {
    findUnique: async () => null,
    create: async () => ({}),
  },
  session: {
    findUnique: async () => null,
    create: async () => ({}),
  },
  verificationToken: {
    findUnique: async () => null,
    create: async () => ({}),
  },
} as any;
