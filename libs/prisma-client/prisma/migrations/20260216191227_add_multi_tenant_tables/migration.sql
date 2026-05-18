/*
  Warnings:

  - You are about to drop the column `statusId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userTypeId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationId,name]` on the table `FeatureCollection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationId,userType]` on the table `UserType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `FeatureCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Policy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `UserType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_statusId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userTypeId_fkey";

-- DropIndex
DROP INDEX "FeatureCollection_name_key";

-- DropIndex
DROP INDEX "FeatureCollection_name_policyId_idx";

-- DropIndex
DROP INDEX "Policy_policyName_idx";

-- DropIndex
DROP INDEX "User_userTypeId_userId_idx";

-- DropIndex
DROP INDEX "UserType_userType_key";

-- AlterTable
ALTER TABLE "FeatureCollection" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Policy" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "statusId",
DROP COLUMN "userTypeId";

-- AlterTable
ALTER TABLE "UserType" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMembership" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "OrganizationMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "OrganizationMembership_organizationId_idx" ON "OrganizationMembership"("organizationId");

-- CreateIndex
CREATE INDEX "OrganizationMembership_userId_idx" ON "OrganizationMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMembership_organizationId_userId_key" ON "OrganizationMembership"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "FeatureCollection_organizationId_policyId_idx" ON "FeatureCollection"("organizationId", "policyId");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureCollection_organizationId_name_key" ON "FeatureCollection"("organizationId", "name");

-- CreateIndex
CREATE INDEX "Policy_organizationId_idx" ON "Policy"("organizationId");

-- CreateIndex
CREATE INDEX "Policy_organizationId_policyName_idx" ON "Policy"("organizationId", "policyName");

-- CreateIndex
CREATE INDEX "UserType_organizationId_idx" ON "UserType"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_organizationId_userType_key" ON "UserType"("organizationId", "userType");

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureCollection" ADD CONSTRAINT "FeatureCollection_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserType" ADD CONSTRAINT "UserType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
