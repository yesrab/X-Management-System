import { prisma } from "@/lib/prisma";

// const prisma = new PrismaClient();

export async function resetAndSeed() {
  // ⚠️ Wrap everything in transaction
  await prisma.$transaction(async (tx) => {
    // Delete in correct order (respect FK constraints)
    await tx.collectionFeatureMap.deleteMany();
    await tx.featureCollection.deleteMany();
    await tx.moduleFeature.deleteMany();
    await tx.user.deleteMany();
    await tx.userType.deleteMany();
    await tx.policy.deleteMany();
    await tx.userStatus.deleteMany();

    // -------------------------
    // Insert base data
    // -------------------------

    const activeStatus = await tx.userStatus.create({
      data: { status: "ACTIVE" },
    });

    const inactiveStatus = await tx.userStatus.create({
      data: { status: "INACTIVE" },
    });

    const adminPolicy = await tx.policy.create({
      data: {
        policyName: "ADMIN_POLICY",
        description: "Full system access",
      },
    });

    const userPolicy = await tx.policy.create({
      data: {
        policyName: "USER_POLICY",
        description: "Limited access",
      },
    });

    const adminType = await tx.userType.create({
      data: {
        userType: "ADMIN",
        userPolicyId: adminPolicy.id,
      },
    });

    const normalType = await tx.userType.create({
      data: {
        userType: "USER",
        userPolicyId: userPolicy.id,
      },
    });

    // -------------------------
    // Features
    // -------------------------

    const dashboardFeature = await tx.moduleFeature.create({
      data: {
        permissionKey: "DASHBOARD_VIEW",
        type: "ROUTE",
      },
    });

    const userManageFeature = await tx.moduleFeature.create({
      data: {
        permissionKey: "USER_MANAGE",
        type: "API",
        method: "POST",
      },
    });

    // -------------------------
    // Feature Collection
    // -------------------------

    const adminCollection = await tx.featureCollection.create({
      data: {
        name: "ADMIN_CORE",
        policyId: adminPolicy.id,
      },
    });

    await tx.collectionFeatureMap.createMany({
      data: [
        {
          collectionId: adminCollection.id,
          moduleFeatureId: dashboardFeature.id,
        },
        {
          collectionId: adminCollection.id,
          moduleFeatureId: userManageFeature.id,
        },
      ],
    });

    // -------------------------
    // Example Users
    // -------------------------

    await tx.user.create({
      data: {
        userId: "admin",
        userTypeId: adminType.id,
        statusId: activeStatus.id,
        incorrectLoginAttempts: 0,
        maxLoginAttempts: 5,
        maxActiveLogins: 5,
      },
    });

    await tx.user.create({
      data: {
        userId: "john",
        userTypeId: normalType.id,
        statusId: activeStatus.id,
        incorrectLoginAttempts: 0,
        maxLoginAttempts: 5,
        maxActiveLogins: 3,
      },
    });
  });
}
