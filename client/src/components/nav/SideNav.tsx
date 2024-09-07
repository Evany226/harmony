import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getAllGuilds } from "@/lib/guilds";
import { auth } from "@clerk/nextjs/server";
import { Guild } from "@/types";
import CreateGuildDialog from "../global/CreateGuildDialog";

export default async function SideNav() {
  const { getToken } = auth();
  const token = await getToken();

  const guilds = await getAllGuilds(token as string);

  return (
    <ScrollArea className="flex-col h-full w-[5.5rem] fixed top-0 left-0 bg-zinc-900">
      <section className="flex flex-col items-center w-full justify-center mt-2 -b">
        <h1 className="text-gray-300 text-sm font-semibold">Harmony</h1>
        <Link href="/dashboard">
          <Image
            src="/logo-past.png"
            className="border-b border-zinc-600"
            width={60}
            height={60}
            alt="Logo"
          />
        </Link>
      </section>

      <section className="flex flex-col h-full w-full items-center mt-2">
        {guilds.map((guild: Guild) => (
          <Link href={`/guilds/${guild.id}`} key={guild.id}>
            <Image src="/harmony-logo.png" width={60} height={60} alt="Logo" />
          </Link>
        ))}
        <CreateGuildDialog>
          <PlusCircleIcon className="w-16 text-zinc-700 hover:text-zinc-600 cursor-pointer" />
        </CreateGuildDialog>
      </section>
    </ScrollArea>
  );
}
