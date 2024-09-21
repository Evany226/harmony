import { auth } from "@clerk/nextjs/server";

import ProfileCard from "../dashboard/profile/ProfileCard";
import CreateCategoryDialog from "./CreateCategoryDialog";
import CategoryWrapper from "@/components/guilds/CategoryWrapper";
import { Category } from "@/types";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { getGuild, getMember } from "@/lib/guilds";
import GuildDropdown from "./GuildDropdown";

export default async function GuildLeftPanel({ guildId }: { guildId: string }) {
  const { getToken } = auth();
  const token = await getToken();
  const guild = await getGuild(token as string, guildId);

  const currentMember = await getMember(token as string, guildId);

  return (
    <div className="flex flex-col min-w-64 h-full bg-neutral-900 border-x border-zinc-800 relative">
      <GuildDropdown guild={guild} currentMember={currentMember}>
        <header className="w-full flex items-center justify-between h-12 bg-neutral-900 border-b border-zinc-800 px-4 cursor-pointer hover:bg-neutral-800">
          <h1 className="text-gray-300 text-base font-semibold">
            {guild.name}
          </h1>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </header>
      </GuildDropdown>

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
