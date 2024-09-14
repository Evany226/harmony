import { auth } from "@clerk/nextjs/server";

import ProfileCard from "../dashboard/profile/ProfileCard";
import CreateCategoryDialog from "./CreateCategoryDialog";
import CategoryWrapper from "@/components/guilds/CategoryWrapper";
import { Category } from "@/types";
import { Button } from "../ui/button";

import { getGuild } from "@/lib/guilds";

export default async function GuildLeftPanel({ guildId }: { guildId: string }) {
  const { getToken } = auth();
  const token = await getToken();
  const guild = await getGuild(token as string, guildId);

  return (
    <div className="flex flex-col min-w-64 h-full bg-neutral-900 border-x border-zinc-800 relative">
      <header className="flex items-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-4">
        <h1 className="text-gray-300 text-base font-semibold">{guild.name}</h1>
      </header>

      <div className="flex flex-col h-[calc(100%-7rem)] px-2 py-2 max-w-64 space-y-4 mt-2">
        {guild.categories.map((category: Category) => (
          <CategoryWrapper
            key={category.id}
            name={category.name}
            channels={category.channels}
            guildId={guildId}
            categoryId={category.id}
          />
        ))}
        <CreateCategoryDialog guildId={guildId}>
          <Button variant="outline" className="w-full">
            Create Category
          </Button>
        </CreateCategoryDialog>
      </div>

      <ProfileCard />
    </div>
  );
}
