-- CreateEnum
CREATE TYPE "FeatureType" AS ENUM ('ROUTE', 'COMPONENT', 'API');

-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD');

-- CreateTable
CREATE TABLE "ModuleFeature" (
    "id" SERIAL NOT NULL,
    "permissionKey" TEXT NOT NULL,
    "type" "FeatureType" NOT NULL,
    "method" "HttpMethod",
    "metaDataRef" TEXT,

    CONSTRAINT "ModuleFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" SERIAL NOT NULL,
    "policyName" TEXT NOT NULL,
    "policyDescription" VARCHAR(5000) NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyFeatureMap" (
    "id" SERIAL NOT NULL,
    "permissionKeyId" INTEGER NOT NULL,
    "policyId" INTEGER NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "PolicyFeatureMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "systemToken" TEXT,
    "incorrectLoginAttempts" INTEGER NOT NULL,
    "maxLoginAttempts" INTEGER NOT NULL,
    "currentActiveLogins" JSONB,
    "maxActiveLogins" INTEGER NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" SERIAL NOT NULL,
    "userType" TEXT NOT NULL,
    "userPolicyId" INTEGER NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "UserStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleFeature_permissionKey_key" ON "ModuleFeature"("permissionKey");

-- CreateIndex
CREATE INDEX "Policy_policyName_idx" ON "Policy"("policyName");

-- CreateIndex
CREATE UNIQUE INDEX "PolicyFeatureMap_permissionKeyId_policyId_key" ON "PolicyFeatureMap"("permissionKeyId", "policyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_userType_key" ON "UserType"("userType");

-- CreateIndex
CREATE UNIQUE INDEX "UserStatus_status_key" ON "UserStatus"("status");

-- AddForeignKey
ALTER TABLE "PolicyFeatureMap" ADD CONSTRAINT "PolicyFeatureMap_permissionKeyId_fkey" FOREIGN KEY ("permissionKeyId") REFERENCES "ModuleFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyFeatureMap" ADD CONSTRAINT "PolicyFeatureMap_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserType" ADD CONSTRAINT "UserType_userPolicyId_fkey" FOREIGN KEY ("userPolicyId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
