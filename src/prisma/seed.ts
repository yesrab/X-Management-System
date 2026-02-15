import { hash, Algorithm } from "@node-rs/argon2";
import { Prisma, PrismaClient, FeatureType, HttpMethod } from "@/generated/prisma/client";
import "dotenv/config";
import { prisma } from "@/lib/prisma";

const cleanDatabase = async (tx: Prisma.TransactionClient | PrismaClient): Promise<void> => {
  await tx.featureCollection.deleteMany();
  await tx.moduleFeature.deleteMany();
  await tx.collectionFeatureMap.deleteMany();
  await tx.user.deleteMany();
  await tx.userType.deleteMany();
  await tx.policy.deleteMany();
  await tx.userStatus.deleteMany();
};

async function cleaner() {
  console.log("🌱 Seeding database...");
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  try {
    await prisma.$transaction(cleanDatabase);
    console.log("🧹 Database cleared successfully");
  } catch (error) {
    console.error("❌ Failed to clear database:", error);
    throw error;
  }
}

async function seeder() {
  // USER STATUS
  const activeStatus = await prisma.userStatus.create({ data: { status: "ACTIVE" } });
  const lockedStatus = await prisma.userStatus.create({ data: { status: "LOCKED" } });

  // MODULE FEATURES
  const dashboardFeature = await prisma.moduleFeature.create({
    data: {
      permissionKey: "dashboard:view",
      type: FeatureType.ROUTE,
    },
  });

  const usersGetFeature = await prisma.moduleFeature.create({
    data: {
      permissionKey: "users:get",
      type: FeatureType.API,
      method: HttpMethod.GET,
    },
  });

  const usersCreateFeature = await prisma.moduleFeature.create({
    data: {
      permissionKey: "users:create",
      type: FeatureType.API,
      method: HttpMethod.POST,
    },
  });

  const usersComponentFeature = await prisma.moduleFeature.create({
    data: {
      permissionKey: "users:component",
      type: FeatureType.COMPONENT,
    },
  });

  console.log("✅ Module features created");

  // POLICY
  const adminPolicy = await prisma.policy.create({
    data: {
      policyName: "ADMIN_POLICY",
      description: "Full system access",
    },
  });

  // FEATURE COLLECTION
  const adminCollection = await prisma.featureCollection.create({
    data: {
      name: "ADMIN_FEATURES",
      description: "All admin permissions",
      policyId: adminPolicy.id,
    },
  });

  // MAP FEATURES TO COLLECTION
  await prisma.collectionFeatureMap.createMany({
    data: [
      { collectionId: adminCollection.id, moduleFeatureId: dashboardFeature.id },
      { collectionId: adminCollection.id, moduleFeatureId: usersGetFeature.id },
      { collectionId: adminCollection.id, moduleFeatureId: usersCreateFeature.id },
      { collectionId: adminCollection.id, moduleFeatureId: usersComponentFeature.id },
    ],
  });

  console.log("🔗 Features mapped");

  // USER TYPE
  const adminUserType = await prisma.userType.create({
    data: {
      userType: "ADMIN",
      userPolicyId: adminPolicy.id,
    },
  });

  // HASH PASSWORD (argon2id)
  const passwordHash = await hash("Admin@123", {
    algorithm: 2, // argon2id
    memoryCost: 65536, // 64MB
    timeCost: 3,
    parallelism: 1,
  });

  // ADMIN USER (idempotent)
  await prisma.user.upsert({
    where: { userId: "admin" },
    update: {
      passwordHash,
      userTypeId: adminUserType.id,
      statusId: activeStatus.id,
      incorrectLoginAttempts: 0,
      maxLoginAttempts: 5,
      currentActiveLogins: [],
      maxActiveLogins: 3,
    },
    create: {
      userId: "admin",
      passwordHash,
      userTypeId: adminUserType.id,
      statusId: activeStatus.id,
      incorrectLoginAttempts: 0,
      maxLoginAttempts: 5,
      currentActiveLogins: [],
      maxActiveLogins: 3,
    },
  });

  console.log("👤 Admin user created");
  console.log("🎉 Seed completed successfully");
}

async function main() {
  await cleaner();
  return seeder()
    .catch((e) => {
      console.error("❌ Seed failed:", e);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export { main };
