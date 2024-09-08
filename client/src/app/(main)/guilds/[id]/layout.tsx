import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import { getGuild } from "@/lib/guilds";

import ChannelPanel from "@/components/guilds/ChannelPanel";

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

      <main className="w-full h-[calc(100%-3rem)] flex flex-col">
        <article className="w-3/4 h-full border-r border-zinc-800 flex flex-col relative px-5">
          {children}
        </article>
      </main>
    </section>
  );
}
