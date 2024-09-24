"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Conversation, User } from "@/types/index";
import { socket } from "@/app/socket";
import ConvDropdown from "./ConvDropdown";
import { Skeleton } from "../ui/skeleton";
import ConnectionStatus from "../global/ConnectionStatus";
import { useSocket } from "@/context/SocketContext";
import Image from "next/image";

interface ConvLinkProps {
  users: User[];
  href: string;
  status: boolean;
}

interface ConvLinkWrapperProps {
  conversations: Conversation[];
}

export function ConvLink({ users, href, status }: ConvLinkProps) {
  const pathname = usePathname();

  const header = users.map((user: User) => user.username).join(", ");

  if (!users) {
    return <p>Failed to load users</p>;
  }

  return (
    <>
      {users.length > 1 ? (
        <Link href={href}>
          <div
            className={`group flex items-center w-full bg-neutral-900 px-2 py-2 mt-1 rounded-sm hover:bg-neutral-800 cursor-pointer ${
              pathname == href ? "bg-zinc-700" : ""
            }`}
          >
            <div className="relative w-10 h-10">
              <Avatar className="w-7 h-7 absolute top-0 left-0">
                <AvatarImage src={users[0].imageUrl} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full" />
                </AvatarFallback>
              </Avatar>

              <Avatar
                className={`group-hover:border-neutral-800 w-7 h-7 absolute bottom-0 right-0 border-2  ${
                  pathname == href ? "border-zinc-700" : "border-neutral-900"
                }`}
              >
                <AvatarImage src={users[1].imageUrl} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full" />
                </AvatarFallback>
              </Avatar>
              <ConnectionStatus isConnected={status} />
            </div>
            <div className="flex items-center ml-3 max-w-full no-wrap overflow-hidden">
              <p className="text-base text-gray-300 font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                {header}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <Link href={href}>
          <div
            className={`flex items-center w-full bg-neutral-900 px-2 py-2 mt-1 rounded-sm hover:bg-neutral-800 cursor-pointer ${
              pathname == href ? "bg-zinc-700" : ""
            }`}
          >
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src={users[0].imageUrl} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full" />
                </AvatarFallback>
              </Avatar>
              <ConnectionStatus isConnected={status} />
            </div>
            <div className="flex items-center ml-3 max-w-full no-wrap overflow-hidden">
              <p className="text-base text-gray-300 font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                {header}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default function ConvLinkWrapper({
  conversations,
}: ConvLinkWrapperProps) {
  const { onlineUsers } = useSocket();

  return (
    <>
      <section className="flex-col w-full max-h-full mt-4">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-gray-400 text-sm font-medium">Direct Messages</h2>
          <ConvDropdown>
            <PlusIcon className="w-4 text-gray-400" />
          </ConvDropdown>
        </div>

        <div className="flex-col mt-3">
          {conversations.map((conversation) => {
            const onlineStatus = conversation.users.some((user) =>
              onlineUsers.includes(user.id)
            );

            return (
              <ConvLink
                key={conversation.id}
                users={conversation.users}
                href={`/conversations/${conversation.id}`}
                status={onlineStatus}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
