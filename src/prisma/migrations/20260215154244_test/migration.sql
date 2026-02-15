-- RenameForeignKey
ALTER TABLE "CollectionFeatureMap" RENAME CONSTRAINT "CollectionFeatureMap_featureListId_fkey" TO "CollectionFeatureMap_collectionId_fkey";

-- RenameIndex
ALTER INDEX "CollectionFeatureMap_featureListId_moduleFeatureId_key" RENAME TO "CollectionFeatureMap_collectionId_moduleFeatureId_key";
