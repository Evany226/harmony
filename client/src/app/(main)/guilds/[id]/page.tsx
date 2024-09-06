"use client";

import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import { getGuild } from "@/lib/guilds";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Guild } from "@/types";
import LeftPanel from "@/components/guilds/LeftPanel";

export default function GuildPage({ params }: { params: { id: string } }) {
  const { getToken } = useAuth();
  const [guild, setGuild] = useState<Guild | null>(null);

  useEffect(() => {
    const fetchGuild = async () => {
      try {
        const token = await getToken();
        const guild = await getGuild(token as string, params.id);
        setGuild(guild);
      } catch (error) {
        console.error("Error fetching guild:", error);
      }
    };

    fetchGuild();
  });

  if (guild === null) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex w-full h-full bg-zinc-900">
      <div className="flex flex-col min-w-64 h-full bg-neutral-900 border-x border-zinc-800 relative">
        <header className="flex items-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-4">
          <h1 className="text-gray-300 text-base font-semibold">
            {guild.name}
          </h1>
        </header>

        <ProfileCard />
      </div>

      <main className="w-full h-[calc(100%-3rem)] flex flex-col">
        <article className="w-3/4 h-full border-r border-zinc-800 flex flex-col relative px-5">
          <p className="text-gray-300">This is a guild page: {params.id}</p>
        </article>
      </main>
    </section>
  );
}
