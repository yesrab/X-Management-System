/*
  Warnings:

  - You are about to drop the column `policyDescription` on the `Policy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "policyDescription",
ADD COLUMN     "description" VARCHAR(5000);

-- CreateIndex
CREATE INDEX "User_userTypeId_userId_idx" ON "User"("userTypeId", "userId");
