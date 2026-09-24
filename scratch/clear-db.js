const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  console.log('Database cleared! All users and tokens have been deleted.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
