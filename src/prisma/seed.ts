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
  await prisma.userType.deleteMany();
  await prisma.policy.deleteMany();
  await prisma.organizationMembership.deleteMany();
  await prisma.moduleFeature.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();
  await prisma.userStatus.deleteMany();

  console.log("✅ Database cleared");
}

/* =====================================================
   USER STATUS (GLOBAL)
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
   ORGANIZATION (TENANT)
===================================================== */

async function createOrganization() {
  return prisma.organization.create({
    data: {
      name: "Default School",
      slug: "default-school",
    },
  });
}

/* =====================================================
   MODULE FEATURES (GLOBAL PLATFORM FEATURES)
===================================================== */

async function createModuleFeatures() {
  const features = await prisma.moduleFeature.createMany({
    data: [
      {
        permissionKey: "dashboard:view",
        type: FeatureType.ROUTE,
      },
      {
        permissionKey: "users:get",
        type: FeatureType.API,
        method: HttpMethod.GET,
      },
      {
        permissionKey: "users:create",
        type: FeatureType.API,
        method: HttpMethod.POST,
      },
      {
        permissionKey: "users:component",
        type: FeatureType.COMPONENT,
        method: null,
      },
      {
        permissionKey: "DANGER:reset_data",
        type: FeatureType.API,
        method: null,
      },
    ],
  });

  console.log("✅ Module features created");

  return prisma.moduleFeature.findMany();
}

/* =====================================================
   POLICY + COLLECTION (ORG SCOPED)
===================================================== */

async function createAdminPolicy(organizationId: number) {
  return prisma.policy.create({
    data: {
      organizationId,
      policyName: "ADMIN_POLICY",
      description: "Full system access",
    },
  });
}

async function createAdminFeatureCollection(organizationId: number, policyId: number) {
  return prisma.featureCollection.create({
    data: {
      organizationId,
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
   USER TYPE (ORG SCOPED ROLE)
===================================================== */

async function createAdminUserType(organizationId: number, policyId: number) {
  return prisma.userType.create({
    data: {
      organizationId,
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
   ADMIN USER (GLOBAL)
===================================================== */

async function upsertAdminUser(passwordHash: string) {
  return prisma.user.upsert({
    where: { userId: "admin" },
    update: {
      passwordHash,
      incorrectLoginAttempts: 0,
      maxLoginAttempts: 5,
      currentActiveLogins: [],
      maxActiveLogins: 3,
    },
    create: {
      userId: "admin",
      passwordHash,
      incorrectLoginAttempts: 0,
      maxLoginAttempts: 5,
      currentActiveLogins: [],
      maxActiveLogins: 3,
    },
  });
}

/* =====================================================
   ORGANIZATION MEMBERSHIP
===================================================== */

async function createAdminMembership(
  organizationId: number,
  userId: number,
  userTypeId: number,
  statusId: number,
) {
  await prisma.organizationMembership.create({
    data: {
      organizationId,
      userId,
      userTypeId,
      statusId,
    },
  });

  console.log("🏢 Admin added to organization");
}

/* =====================================================
   SEED FLOW
===================================================== */

async function seed(): Promise<void> {
  console.log("🌱 Seeding database...");

  const { active } = await createUserStatuses();

  const organization = await createOrganization();

  const features = await createModuleFeatures();

  const policy = await createAdminPolicy(organization.id);

  const collection = await createAdminFeatureCollection(organization.id, policy.id);

  await mapFeaturesToCollection(
    collection.id,
    features.map((f) => f.id),
  );

  const adminUserType = await createAdminUserType(organization.id, policy.id);

  const passwordHash = await hashPassword("Admin@123");

  const adminUser = await upsertAdminUser(passwordHash);

  await createAdminMembership(organization.id, adminUser.id, adminUserType.id, active.id);

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
