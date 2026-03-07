import { hashPassword } from '@/lib/crypto';
import { FeatureType, HttpMethod } from '@/generated/prisma/client';
import 'dotenv/config';

import { prisma } from '@/lib/prisma';
import logger from '@/lib/logger';

/* =====================================================
   CLEAN DATABASE
===================================================== */

async function cleanDatabase(): Promise<void> {
  logger.info('🧹 Cleaning database...');

  try {
    await prisma.collectionFeatureMap.deleteMany();
    await prisma.featureCollection.deleteMany();
    await prisma.userType.deleteMany();
    await prisma.policy.deleteMany();
    await prisma.organizationMembership.deleteMany();
    await prisma.moduleFeature.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    await prisma.userStatus.deleteMany();

    logger.info('✅ Database cleared');
  } catch (error) {
    logger.error({ err: error }, 'Failed to clean database');
    throw error;
  }
}

/* =====================================================
   USER STATUS (GLOBAL)
===================================================== */

async function createUserStatuses() {
  try {
    const active = await prisma.userStatus.create({
      data: { status: 'ACTIVE' },
    });

    const locked = await prisma.userStatus.create({
      data: { status: 'LOCKED' },
    });

    logger.info('✅ User statuses created');
    return { active, locked };
  } catch (error) {
    logger.error({ err: error }, 'Failed to create user statuses');
    throw error;
  }
}

/* =====================================================
   ORGANIZATION (TENANT)
===================================================== */

async function createOrganization() {
  try {
    const org = await prisma.organization.create({
      data: {
        name: 'Default School',
        slug: 'default-school',
      },
    });
    logger.info('✅ Organization created');
    return org;
  } catch (error) {
    logger.error({ err: error }, 'Failed to create organization');
    throw error;
  }
}

/* =====================================================
   MODULE FEATURES (GLOBAL PLATFORM FEATURES)
===================================================== */

async function createModuleFeatures() {
  try {
    await prisma.moduleFeature.createMany({
      data: [
        {
          permissionKey: 'dashboard:view',
          type: FeatureType.ROUTE,
        },
        {
          permissionKey: 'users:get',
          type: FeatureType.API,
          method: HttpMethod.GET,
        },
        {
          permissionKey: 'users:create',
          type: FeatureType.API,
          method: HttpMethod.POST,
        },
        {
          permissionKey: 'users:component',
          type: FeatureType.COMPONENT,
          method: null,
        },
        {
          permissionKey: 'DANGER:reset_data',
          type: FeatureType.API,
          method: null,
        },
      ],
    });

    logger.info('✅ Module features created');

    return prisma.moduleFeature.findMany();
  } catch (error) {
    logger.error({ err: error }, 'Failed to create module features');
    throw error;
  }
}

/* =====================================================
   POLICY + COLLECTION (ORG SCOPED)
===================================================== */

async function createAdminPolicy(organizationId: number) {
  try {
    const policy = await prisma.policy.create({
      data: {
        organizationId,
        policyName: 'ADMIN_POLICY',
        description: 'Full system access',
      },
    });
    logger.info('✅ Admin policy created');
    return policy;
  } catch (error) {
    logger.error({ err: error }, 'Failed to create admin policy');
    throw error;
  }
}

async function createAdminFeatureCollection(
  organizationId: number,
  policyId: number,
) {
  try {
    const collection = await prisma.featureCollection.create({
      data: {
        organizationId,
        name: 'ADMIN_FEATURES',
        description: 'All admin permissions',
        policyId,
      },
    });
    logger.info('✅ Admin feature collection created');
    return collection;
  } catch (error) {
    logger.error({ err: error }, 'Failed to create admin feature collection');
    throw error;
  }
}

async function mapFeaturesToCollection(
  collectionId: number,
  featureIds: number[],
): Promise<void> {
  try {
    await prisma.collectionFeatureMap.createMany({
      data: featureIds.map((featureId) => ({
        collectionId,
        moduleFeatureId: featureId,
      })),
    });

    logger.info('🔗 Features mapped to collection');
  } catch (error) {
    logger.error({ err: error }, 'Failed to map features to collection');
    throw error;
  }
}

/* =====================================================
   USER TYPE (ORG SCOPED ROLE)
===================================================== */

async function createAdminUserType(organizationId: number, policyId: number) {
  try {
    const userType = await prisma.userType.create({
      data: {
        organizationId,
        userType: 'ADMIN',
        userPolicyId: policyId,
      },
    });
    logger.info('✅ Admin user type created');
    return userType;
  } catch (error) {
    logger.error({ err: error }, 'Failed to create admin user type');
    throw error;
  }
}

/* =====================================================
   ADMIN USER (GLOBAL)
===================================================== */

async function upsertAdminUser(passwordHash: string) {
  try {
    const user = await prisma.user.upsert({
      where: { userId: 'admin' },
      update: {
        passwordHash,
        incorrectLoginAttempts: 0,
        maxLoginAttempts: 5,
        currentActiveLogins: [],
        maxActiveLogins: 3,
      },
      create: {
        userId: 'admin',
        passwordHash,
        email: 'admin@edu.com',
        incorrectLoginAttempts: 0,
        maxLoginAttempts: 5,
        currentActiveLogins: [],
        maxActiveLogins: 3,
      },
    });
    logger.info('✅ Admin user created/updated');
    return user;
  } catch (error) {
    logger.error({ err: error }, 'Failed to upsert admin user');
    throw error;
  }
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
  try {
    await prisma.organizationMembership.create({
      data: {
        organizationId,
        userId,
        userTypeId,
        statusId,
      },
    });

    logger.info('🏢 Admin added to organization');
  } catch (error) {
    logger.error({ err: error }, 'Failed to create admin membership');
    throw error;
  }
}

/* =====================================================
   SEED FLOW
===================================================== */

async function seed(): Promise<void> {
  logger.info('🌱 Seeding database...');

  try {
    const { active } = await createUserStatuses();

    const organization = await createOrganization();

    const features = await createModuleFeatures();

    const policy = await createAdminPolicy(organization.id);

    const collection = await createAdminFeatureCollection(
      organization.id,
      policy.id,
    );

    await mapFeaturesToCollection(
      collection.id,
      features.map((f) => f.id),
    );

    const adminUserType = await createAdminUserType(organization.id, policy.id);

    const passwordHash = await hashPassword('Admin@123');

    const adminUser = await upsertAdminUser(passwordHash);

    await createAdminMembership(
      organization.id,
      adminUser.id,
      adminUserType.id,
      active.id,
    );

    logger.info('🎉 Seed completed successfully');
  } catch (error) {
    logger.error({ err: error }, 'Seeding failed');
    throw error;
  }
}

/* =====================================================
   ENTRY
===================================================== */

export async function main(): Promise<void> {
  try {
    if (!process.env.DATABASE_URL) {
      logger.error('DATABASE_URL environment variable is not set');
      throw new Error('DATABASE_URL environment variable is not set');
    }

    logger.info('Starting database seed process...');
    await cleanDatabase();
    await seed();
    logger.info('Database seed process completed successfully');
  } catch (error) {
    logger.error({ err: error }, 'Database seed process failed');
    throw error;
  } finally {
    await prisma.$disconnect();
    logger.info('Prisma client disconnected');
  }
}
