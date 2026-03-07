/*
 Warnings:
 
 - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
 
 */
-- AlterTable: Add email column as nullable first
ALTER TABLE
  "User"
ADD
  COLUMN "email" TEXT;

-- Populate email column using userId template
UPDATE
  "User"
SET
  "email" = "userId" || '@edu.com';

-- AlterTable: Make email column NOT NULL after data is populated
ALTER TABLE
  "User"
ALTER COLUMN
  "email"
SET
  NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_userId_email_idx" ON "User"("userId", "email");