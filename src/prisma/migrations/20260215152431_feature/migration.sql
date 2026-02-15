/*
  Warnings:

  - You are about to drop the `FeatureList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeatureList" DROP CONSTRAINT "FeatureList_policyId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureListModuleFeature" DROP CONSTRAINT "FeatureListModuleFeature_featureListId_fkey";

-- DropTable
DROP TABLE "FeatureList";

-- CreateTable
CREATE TABLE "FeatureCollection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(5000),
    "policyId" INTEGER NOT NULL,
    "metaDataRef" TEXT,

    CONSTRAINT "FeatureCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeatureCollection_name_key" ON "FeatureCollection"("name");

-- CreateIndex
CREATE INDEX "FeatureCollection_name_idx" ON "FeatureCollection"("name");

-- AddForeignKey
ALTER TABLE "FeatureCollection" ADD CONSTRAINT "FeatureCollection_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureListModuleFeature" ADD CONSTRAINT "FeatureListModuleFeature_featureListId_fkey" FOREIGN KEY ("featureListId") REFERENCES "FeatureCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
