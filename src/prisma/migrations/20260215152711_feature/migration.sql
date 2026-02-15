/*
  Warnings:

  - You are about to drop the `FeatureListModuleFeature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeatureListModuleFeature" DROP CONSTRAINT "FeatureListModuleFeature_featureListId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureListModuleFeature" DROP CONSTRAINT "FeatureListModuleFeature_moduleFeatureId_fkey";

-- DropIndex
DROP INDEX "FeatureCollection_name_idx";

-- DropTable
DROP TABLE "FeatureListModuleFeature";

-- CreateTable
CREATE TABLE "CollectionFeatureMap" (
    "id" SERIAL NOT NULL,
    "featureListId" INTEGER NOT NULL,
    "moduleFeatureId" INTEGER NOT NULL,

    CONSTRAINT "CollectionFeatureMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionFeatureMap_featureListId_moduleFeatureId_key" ON "CollectionFeatureMap"("featureListId", "moduleFeatureId");

-- CreateIndex
CREATE INDEX "FeatureCollection_name_policyId_idx" ON "FeatureCollection"("name", "policyId");

-- AddForeignKey
ALTER TABLE "CollectionFeatureMap" ADD CONSTRAINT "CollectionFeatureMap_featureListId_fkey" FOREIGN KEY ("featureListId") REFERENCES "FeatureCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionFeatureMap" ADD CONSTRAINT "CollectionFeatureMap_moduleFeatureId_fkey" FOREIGN KEY ("moduleFeatureId") REFERENCES "ModuleFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
