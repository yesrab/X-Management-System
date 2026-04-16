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
    "description" VARCHAR(5000),
    "metaDataRef" TEXT,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureCollection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(5000),
    "policyId" INTEGER NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "FeatureCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionFeatureMap" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "moduleFeatureId" INTEGER NOT NULL,

    CONSTRAINT "CollectionFeatureMap_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "FeatureCollection_name_key" ON "FeatureCollection"("name");

-- CreateIndex
CREATE INDEX "FeatureCollection_name_policyId_idx" ON "FeatureCollection"("name", "policyId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionFeatureMap_collectionId_moduleFeatureId_key" ON "CollectionFeatureMap"("collectionId", "moduleFeatureId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE INDEX "User_userTypeId_userId_idx" ON "User"("userTypeId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_userType_key" ON "UserType"("userType");

-- CreateIndex
CREATE UNIQUE INDEX "UserStatus_status_key" ON "UserStatus"("status");

-- AddForeignKey
ALTER TABLE "FeatureCollection" ADD CONSTRAINT "FeatureCollection_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionFeatureMap" ADD CONSTRAINT "CollectionFeatureMap_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "FeatureCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionFeatureMap" ADD CONSTRAINT "CollectionFeatureMap_moduleFeatureId_fkey" FOREIGN KEY ("moduleFeatureId") REFERENCES "ModuleFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserType" ADD CONSTRAINT "UserType_userPolicyId_fkey" FOREIGN KEY ("userPolicyId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
