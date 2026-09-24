// Mock PrismaClient to prevent module not found errors during UI testing
// This is a temporary bypass because the Prisma client generation is failing.

const users = new Map();

export const prisma = {
  user: {
    findUnique: async ({ where }: any) => users.get(where?.email) || null,
    create: async ({ data }: any) => {
      const user = { id: "user-1", emailVerified: new Date(), ...data };
      users.set(data.email, user);
      return user;
    },
    update: async ({ where, data }: any) => {
      const user = users.get(where?.email);
      if (user) {
        Object.assign(user, data);
        users.set(where.email, user);
      }
      return user || {};
    },
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
    upsert: async () => ({}),
    deleteMany: async () => ({ count: 0 }),
    findFirst: async () => ({ expires: new Date(Date.now() + 10 * 60 * 1000) }),
    delete: async () => ({}),
  },
} as any;
