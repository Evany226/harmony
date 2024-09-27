-- DropForeignKey
ALTER TABLE "ChannelMessages" DROP CONSTRAINT "ChannelMessages_senderId_fkey";

-- AddForeignKey
ALTER TABLE "ChannelMessages" ADD CONSTRAINT "ChannelMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
