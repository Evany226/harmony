-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_guildId_fkey";

-- DropForeignKey
ALTER TABLE "GuildRequests" DROP CONSTRAINT "GuildRequests_fromGuildId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_guildId_fkey";

-- DropForeignKey
ALTER TABLE "TextChannel" DROP CONSTRAINT "TextChannel_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildRequests" ADD CONSTRAINT "GuildRequests_fromGuildId_fkey" FOREIGN KEY ("fromGuildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextChannel" ADD CONSTRAINT "TextChannel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
