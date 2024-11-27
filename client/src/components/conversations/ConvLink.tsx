"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Conversation, User, Participant } from "@/types/index";

import ConvDropdown from "./ConvDropdown";
import { Skeleton } from "../ui/skeleton";
import ConnectionStatus from "../global/ConnectionStatus";
import { useSocket } from "@/context/SocketContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getUnreadMessages } from "@/lib/conversations";
import { useAuth } from "@clerk/nextjs";
import { updateLastViewed } from "@/actions/actions";

interface ConvLinkProps {
  users: User[];
  href: string;
  status: boolean;
  id: string;
}

interface ConvLinkWrapperProps {
  conversations: Conversation[];
}

export function ConvLink({ users, href, status, id }: ConvLinkProps) {
  const { socket } = useSocket();
  const pathname = usePathname();
  const { getToken } = useAuth();

  const header = users.map((user: User) => user.username).join(", ");

  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const response = await getUnreadMessages(token as string, id);

      console.log(response);

      setUnreadMessages(response);
    };

    fetchData();
  }, [getToken, id]);

  useEffect(() => {
    const handleUnreadMessage = () => {
      if (pathname !== href) {
        setUnreadMessages((prev) => prev + 1);
      }
    };

    // Attach the socket event listener
    socket.on(`unread ${id}`, handleUnreadMessage);

    if (pathname === href) {
      const update = async () => {
        await updateLastViewed(id);
        setUnreadMessages(0);
      }; // Ensure it's called on conversation open

      update();
    }

    return () => {
      socket.off(`unread ${id}`, handleUnreadMessage);
    };
  }, [id, socket, pathname, href]);

  if (!users) {
    return <p>Failed to load users</p>;
  }

  return (
    <Link href={href}>
      <div
        className={`group flex items-center w-full bg-neutral-900 px-2 py-2 mt-1 rounded-sm hover:bg-neutral-800 cursor-pointer ${
          pathname == href ? "bg-zinc-700" : ""
        }`}
      >
        <div className="relative min-w-10 h-10">
          {users.length > 1 ? (
            <>
              <Avatar
                className={`group-hover:border-neutral-800 w-7 h-7 absolute top-0 left-0 border-2 ${
                  pathname == href ? "border-zinc-700" : "border-neutral-900"
                }`}
              >
                <AvatarImage src={users[0].imageUrl} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full" />
                </AvatarFallback>
              </Avatar>

              <Avatar
                className={`group-hover:border-neutral-800 w-7 h-7 absolute bottom-0 right-0 border-2 ${
                  pathname == href ? "border-zinc-700" : "border-neutral-900"
                }`}
              >
                <AvatarImage src={users[1].imageUrl} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full" />
                </AvatarFallback>
              </Avatar>
              <ConnectionStatus isConnected={status} />
            </>
          ) : (
            <>
              <Avatar>
                <AvatarImage src={users[0].imageUrl} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full" />
                </AvatarFallback>
              </Avatar>
              <ConnectionStatus isConnected={status} />
            </>
          )}
        </div>
        <div className="flex items-center ml-3 w-64 overflow-hidden relative">
          <p className="text-base text-gray-300 font-medium overflow-hidden whitespace-nowrap text-ellipsis">
            {header}
          </p>

          {unreadMessages > 0 && (
            <div className="absolute right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <p className="text-white text-sm">{unreadMessages}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
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
            const allUsers = conversation.participants.map((participant) => {
              return participant.user;
            });

            const onlineStatus = allUsers.some((user) =>
              onlineUsers.includes(user.id)
            );

            return (
              <ConvLink
                key={conversation.id}
                users={allUsers}
                href={`/conversations/${conversation.id}`}
                status={onlineStatus}
                id={conversation.id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
