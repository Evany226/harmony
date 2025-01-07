"use client";

import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Guild, Category, UnreadMessage } from "@/types";
import CreateGuildDialog from "../guilds/CreateGuildDialog";
import SideNavTooltip from "./SideNavTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";

export default function SideNav({
  unreadMessages,
  guilds,
}: {
  unreadMessages: UnreadMessage[];
  guilds: Guild[];
}) {
  const pathname = usePathname();

  const mobileRoutes = ["/home/friends", "/guilds"];

  const showOnMobile = mobileRoutes.some((route) => pathname.includes(route));

  return (
    <ScrollArea
      className={`flex-col h-full w-[5.5rem] fixed top-0 left-0 bg-zinc-900 border-r border-zinc-800 ${
        showOnMobile ? "" : "sm:w-0 sm:hidden"
      }`}
    >
      <section className="flex flex-col items-center w-full justify-center mt-2 -b">
        <h1 className="text-gray-300 text-sm font-semibold">Harmony</h1>
        <SideNavTooltip text="Direct Messages">
          <Link href="/home/friends">
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

      <section className="flex flex-col items-center mt-2 space-y-2">
        {unreadMessages.map((notification) => {
          const conv = notification.conversation.participants.length;

          const convUsers = notification.conversation.participants.map(
            (participant) => {
              return participant.user;
            }
          );
          const isMultiUser = convUsers.length > 1 && convUsers.length !== 2;

          return (
            <SideNavTooltip
              text={conv.toString()}
              key={notification.participantId}
            >
              <Link
                href={`/conversations/${notification.messages[0].conversationId}`}
                className="relative block"
              >
                {isMultiUser ? (
                  <div className="relative min-w-12 h-12 ">
                    <Avatar
                      className={`group-hover:border-neutral-800 w-8 h-8 absolute top-0 left-0 border-2 border-neutral-900
                      `}
                    >
                      <AvatarImage src={convUsers[0].imageUrl} />
                      <AvatarFallback>
                        <Skeleton className="w-full h-full" />
                      </AvatarFallback>
                    </Avatar>
                    <Avatar
                      className={`group-hover:border-neutral-800 w-8 h-8 absolute bottom-0 right-0 border-2 border-neutral-900
                      }`}
                    >
                      <AvatarImage src={convUsers[1].imageUrl} />
                      <AvatarFallback>
                        <Skeleton className="w-full h-full" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={notification.messages[0].sender.user.imageUrl}
                      alt={notification.messages[0].sender.user.username}
                    />
                    <AvatarFallback>
                      <Skeleton className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="absolute right-0 bottom-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center ring-4 ring-zinc-900 ">
                  <p className="text-white text-xs font-semibold">
                    {notification.messages.length}
                  </p>
                </div>
              </Link>
            </SideNavTooltip>
          );
        })}
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
                      <Skeleton className="h-12 w-12" />
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
