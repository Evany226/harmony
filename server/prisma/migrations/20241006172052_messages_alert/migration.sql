-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- AlterTable
ALTER TABLE "ChannelMessages" ADD COLUMN     "isAlert" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "senderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isAlert" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "senderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
