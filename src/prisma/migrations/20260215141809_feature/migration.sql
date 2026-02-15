/*
  Warnings:

  - You are about to drop the `PolicyFeatureMap` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PolicyFeatureMap" DROP CONSTRAINT "PolicyFeatureMap_permissionKeyId_fkey";

-- DropForeignKey
ALTER TABLE "PolicyFeatureMap" DROP CONSTRAINT "PolicyFeatureMap_policyId_fkey";

-- DropTable
DROP TABLE "PolicyFeatureMap";

-- CreateTable
CREATE TABLE "FeatureList" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(5000),
    "policyId" INTEGER NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "FeatureList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureListModuleFeature" (
    "id" SERIAL NOT NULL,
    "featureListId" INTEGER NOT NULL,
    "moduleFeatureId" INTEGER NOT NULL,

    CONSTRAINT "FeatureListModuleFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeatureListModuleFeature_featureListId_moduleFeatureId_key" ON "FeatureListModuleFeature"("featureListId", "moduleFeatureId");

-- AddForeignKey
ALTER TABLE "FeatureList" ADD CONSTRAINT "FeatureList_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureListModuleFeature" ADD CONSTRAINT "FeatureListModuleFeature_featureListId_fkey" FOREIGN KEY ("featureListId") REFERENCES "FeatureList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureListModuleFeature" ADD CONSTRAINT "FeatureListModuleFeature_moduleFeatureId_fkey" FOREIGN KEY ("moduleFeatureId") REFERENCES "ModuleFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
