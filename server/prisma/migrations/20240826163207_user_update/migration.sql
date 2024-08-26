/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "hasImage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "username" TEXT;
