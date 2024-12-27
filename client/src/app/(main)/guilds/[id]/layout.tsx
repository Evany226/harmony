import GuildLeftPanel from "@/components/guilds/GuildLeftPanel";
import { HashtagIcon } from "@heroicons/react/24/solid";
import { getChannel } from "@/lib/guilds";

export default async function GuildLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-[calc(100%-5.5rem)] h-full bg-zinc-900">
      <GuildLeftPanel guildId={params.id} />

      <div className="flex flex-col w-[calc(100%-14rem)] h-full bg-zinc-900 sm:hidden sm:w-0">
        {children}
      </div>
    </section>
  );
}
