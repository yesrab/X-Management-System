import { hash } from "@node-rs/argon2";
import { FeatureType, HttpMethod } from "@/generated/prisma/client";
import "dotenv/config";

import { prisma } from "@/lib/prisma";

/* =====================================================
   CLEAN DATABASE
===================================================== */

async function cleanDatabase(): Promise<void> {
  console.log("🧹 Cleaning database...");

  await prisma.collectionFeatureMap.deleteMany();
  await prisma.featureCollection.deleteMany();
  await prisma.moduleFeature.deleteMany();
  await prisma.user.deleteMany();
  await prisma.userType.deleteMany();
  await prisma.policy.deleteMany();
  await prisma.userStatus.deleteMany();

  console.log("✅ Database cleared");
}

/* =====================================================
   USER STATUS
===================================================== */

async function createUserStatuses() {
  const active = await prisma.userStatus.create({
    data: { status: "ACTIVE" },
  });

  const locked = await prisma.userStatus.create({
    data: { status: "LOCKED" },
  });

  return { active, locked };
}

/* =====================================================
   MODULE FEATURES
===================================================== */

async function createModuleFeatures() {
  const dashboard = await prisma.moduleFeature.create({
    data: {
      permissionKey: "dashboard:view",
      type: FeatureType.ROUTE,
    },
  });

  const usersGet = await prisma.moduleFeature.create({
    data: {
      permissionKey: "users:get",
      type: FeatureType.API,
      method: HttpMethod.GET,
    },
  });

  const usersCreate = await prisma.moduleFeature.create({
    data: {
      permissionKey: "users:create",
      type: FeatureType.API,
      method: HttpMethod.POST,
    },
  });

  const usersComponent = await prisma.moduleFeature.create({
    data: {
      permissionKey: "users:component",
      type: FeatureType.COMPONENT,
      method: null, // explicitly null (optional field)
    },
  });

  console.log("✅ Module features created");

  return {
    dashboard,
    usersGet,
    usersCreate,
    usersComponent,
  };
}

/* =====================================================
   POLICY + COLLECTION
===================================================== */

async function createAdminPolicy() {
  return prisma.policy.create({
    data: {
      policyName: "ADMIN_POLICY",
      description: "Full system access",
    },
  });
}

async function createAdminFeatureCollection(policyId: number) {
  return prisma.featureCollection.create({
    data: {
      name: "ADMIN_FEATURES",
      description: "All admin permissions",
      policyId,
    },
  });
}

async function mapFeaturesToCollection(collectionId: number, featureIds: number[]): Promise<void> {
  await prisma.collectionFeatureMap.createMany({
    data: featureIds.map((featureId) => ({
      collectionId,
      moduleFeatureId: featureId,
    })),
  });

  console.log("🔗 Features mapped");
}

/* =====================================================
   USER TYPE
===================================================== */

async function createAdminUserType(policyId: number) {
  return prisma.userType.create({
    data: {
      userType: "ADMIN",
      userPolicyId: policyId,
    },
  });
}

/* =====================================================
   PASSWORD HASHING (argon2id)
===================================================== */

async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    algorithm: 2, // argon2id
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });
}

/* =====================================================
   ADMIN USER
===================================================== */

async function upsertAdminUser(
  passwordHash: string,
  userTypeId: number,
  statusId: number,
): Promise<void> {
  await prisma.user.upsert({
    where: { userId: "admin" },
    update: {
      passwordHash,
      userTypeId,
      statusId,
      incorrectLoginAttempts: 0,
      maxLoginAttempts: 5,
      currentActiveLogins: [],
      maxActiveLogins: 3,
    },
    create: {
      userId: "admin",
      passwordHash,
      userTypeId,
      statusId,
      incorrectLoginAttempts: 0,
      maxLoginAttempts: 5,
      currentActiveLogins: [],
      maxActiveLogins: 3,
    },
  });

  console.log("👤 Admin user ready");
}

/* =====================================================
   SEED FLOW
===================================================== */

async function seed(): Promise<void> {
  console.log("🌱 Seeding database...");

  const { active } = await createUserStatuses();

  const features = await createModuleFeatures();

  const policy = await createAdminPolicy();

  const collection = await createAdminFeatureCollection(policy.id);

  await mapFeaturesToCollection(collection.id, [
    features.dashboard.id,
    features.usersGet.id,
    features.usersCreate.id,
    features.usersComponent.id,
  ]);

  const adminUserType = await createAdminUserType(policy.id);

  const passwordHash = await hashPassword("Admin@123");

  await upsertAdminUser(passwordHash, adminUserType.id, active.id);

  console.log("🎉 Seed completed successfully");
}

/* =====================================================
   ENTRY
===================================================== */

export async function main(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  await cleanDatabase();
  await seed();
}
