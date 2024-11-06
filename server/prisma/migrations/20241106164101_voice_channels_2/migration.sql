/*
  Warnings:

  - You are about to drop the `VoiceChannel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VoiceChannel" DROP CONSTRAINT "VoiceChannel_categoryId_fkey";

-- AlterTable
ALTER TABLE "TextChannel" ADD COLUMN     "isVoice" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "VoiceChannel";
