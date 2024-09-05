-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextChannel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "TextChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GuildUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuildUsers_AB_unique" ON "_GuildUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildUsers_B_index" ON "_GuildUsers"("B");

-- AddForeignKey
ALTER TABLE "TextChannel" ADD CONSTRAINT "TextChannel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildUsers" ADD CONSTRAINT "_GuildUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildUsers" ADD CONSTRAINT "_GuildUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
