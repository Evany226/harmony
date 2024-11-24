import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getAllGuilds } from "@/lib/guilds";
import { auth } from "@clerk/nextjs/server";
import { Guild, Category } from "@/types";
import CreateGuildDialog from "../guilds/CreateGuildDialog";
import SideNavTooltip from "./SideNavTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";

export default async function SideNav() {
  const { getToken } = auth();
  const user = await currentUser();

  const token = await getToken();

  const guilds = await getAllGuilds(token as string);
  return (
    <ScrollArea className="flex-col h-full w-[5.5rem] fixed top-0 left-0 bg-zinc-900">
      <section className="flex flex-col items-center w-full justify-center mt-2 -b">
        <h1 className="text-gray-300 text-sm font-semibold">Harmony</h1>
        <SideNavTooltip text="Direct Messages">
          <Link href="/friends">
            <Image
              src="/images/logo-past.png"
              className="border-b border-zinc-600"
              width={60}
              height={60}
              alt="Logo"
            />
          </Link>
        </SideNavTooltip>
      </section>

      <section className="flex flex-col h-full w-full items-center mt-2 space-y-2">
        {guilds.map((guild: Guild) => {
          const hasChannels =
            guild.categories.length > 0 &&
            guild.categories.some(
              (category: Category) => category.channels.length > 0
            );

          const categoryWithChannels = guild.categories.find(
            (category: Category) => category.channels.length > 0
          );

          return (
            <SideNavTooltip text={guild.name} key={guild.id}>
              <Link
                href={
                  hasChannels && categoryWithChannels
                    ? `/guilds/${guild.id}/${categoryWithChannels.channels[0].id}`
                    : `/guilds/${guild.id}`
                }
              >
                {guild.imageUrl ? (
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={guild.imageUrl} alt={guild.name} />
                    <AvatarFallback>
                      <Skeleton className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Image
                    src="/images/logo-past.png"
                    width={60}
                    height={60}
                    alt="Logo"
                  />
                )}
              </Link>
            </SideNavTooltip>
          );
        })}
        <CreateGuildDialog>
          <div className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center">
            <PlusIcon className="w-6 text-zinc-900 cursor-pointer stroke-[4px]" />
          </div>
        </CreateGuildDialog>
      </section>
    </ScrollArea>
  );
}
