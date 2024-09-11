import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import { getGuild } from "@/lib/guilds";

import ChannelPanel from "@/components/guilds/ChannelPanel";
import { HashtagIcon } from "@heroicons/react/24/solid";

export default async function GuildLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full h-full bg-zinc-900">
      <ChannelPanel guildId={params.id} />

      <div className="flex flex-col w-[100%] h-full bg-zinc-900">
        {children}
      </div>
    </section>
  );
}
