-- CreateTable
CREATE TABLE "GuildRequests" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "fromGuildId" TEXT NOT NULL,

    CONSTRAINT "GuildRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuildRequests" ADD CONSTRAINT "GuildRequests_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildRequests" ADD CONSTRAINT "GuildRequests_fromGuildId_fkey" FOREIGN KEY ("fromGuildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
