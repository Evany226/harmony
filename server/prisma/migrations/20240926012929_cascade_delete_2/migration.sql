-- DropForeignKey
ALTER TABLE "ChannelMessages" DROP CONSTRAINT "ChannelMessages_channelId_fkey";

-- AddForeignKey
ALTER TABLE "ChannelMessages" ADD CONSTRAINT "ChannelMessages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "TextChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
