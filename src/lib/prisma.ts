import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const connectionString = `${process.env.DATABASE_URL}`;
const prismaConnetionString = `${process.env.PRISMA_DATABASE_URL}`;

const connetionToUse =
  process.env.NODE_ENV === 'production'
    ? prismaConnetionString
    : connectionString;

const adapter = new PrismaPg({ connectionString: connetionToUse });
const prisma = new PrismaClient({ adapter }).$extends(withAccelerate());

export type DbClient = typeof prisma;
export { prisma };
