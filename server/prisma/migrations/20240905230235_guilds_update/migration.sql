/*
  Warnings:

  - Added the required column `name` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TextChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guild" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TextChannel" ADD COLUMN     "name" TEXT NOT NULL;
