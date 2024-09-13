import { auth } from "@clerk/nextjs/server";

import ProfileCard from "../dashboard/profile/ProfileCard";
import PanelContextMenu from "./PanelContextMenu";
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

      <PanelContextMenu guild={guild} guildId={guildId} />

      <ProfileCard />
    </div>
  );
}
