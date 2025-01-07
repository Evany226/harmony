"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon, EnvelopeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Conversation,
  User,
  Participant,
  Message,
  UnreadMessage,
} from "@/types/index";

import ConvDropdown from "./ConvDropdown";
import { Skeleton } from "../ui/skeleton";
import ConnectionStatus from "../global/ConnectionStatus";
import { useSocket } from "@/context/SocketContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { updateLastViewed } from "@/actions/actions";

interface ConvLinkProps {
  users: User[];
  href: string;
  status: boolean;
  id: string;
  unreadMessages?: Message[];
}

interface ConvLinkWrapperProps {
  conversations: Conversation[];
  unreadMessages: UnreadMessage[];
}

export function ConvLink({
  users,
  href,
  status,
  id,
  unreadMessages,
}: ConvLinkProps) {
  const { socket } = useSocket();
  const pathname = usePathname();
  const { userId } = useAuth();
  const router = useRouter();

  //if its a dm between 2 people, header shows single image, if group chat, show multiple images
  const header =
    users.length === 2
      ? users.find((user) => user.id !== userId)?.username || ""
      : users.map((user) => user.username).join(", ");

  const otherUser =
    users.length === 2 ? users.find((user) => user.id !== userId) : null;
  const singleAvatar = otherUser?.imageUrl;
  const isMultiUser = users.length > 1 && users.length !== 2;

  //handle sockets for notifications.
  useEffect(() => {
    const handleUnreadMessage = () => {
      if (pathname === href) {
        updateLastViewed(id);
      } else {
        router.refresh();
      }
    };

    // Attach the socket event listener
    socket.on(`unread ${id}`, handleUnreadMessage);

    if (pathname === href) {
      const update = async () => {
        await updateLastViewed(id);
      }; // Ensure it's called on conversation open

      update();
    }

    return () => {
      socket.off(`unread ${id}`, handleUnreadMessage);
    };
  }, [id, socket, pathname, href, router]);

  if (!users) {
    return <p>Failed to load users</p>;
  }

  if (!unreadMessages) {
    return <p>Failed to load unread messages</p>;
  }

  return (
    <Link href={href}>
      <div
        className={`group flex items-center w-full bg-neutral-900 px-2 py-2 mt-1 rounded-sm hover:bg-neutral-800 cursor-pointer ${
          pathname == href ? "bg-zinc-700" : ""
        }`}
        onClick={() => router.refresh()}
      >
        <div className="relative min-w-10 h-10">
          {isMultiUser ? (
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
                <AvatarImage src={singleAvatar} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full" />
                </AvatarFallback>
              </Avatar>
              <ConnectionStatus isConnected={status} />
            </>
          )}
        </div>
        <div className="flex items-center ml-3 w-full overflow-hidden relative">
          <p className="text-base text-gray-300 font-medium overflow-hidden whitespace-nowrap text-ellipsis">
            {header}
          </p>

          {unreadMessages.length > 0 && (
            <div className="absolute right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border border-zinc-950">
              <p className="text-white text-sm">{unreadMessages.length}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ConvLinkWrapper({
  conversations,
  unreadMessages,
}: ConvLinkWrapperProps) {
  const { onlineUsers } = useSocket();
  const { userId } = useAuth();

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
          {conversations.length > 0 ? (
            conversations.map((conversation) => {
              const allUsers = conversation.participants.map((participant) => {
                return participant.user;
              });

              const currentParticipant = conversation.participants.find(
                (participant) => participant.user.id === userId
              );

              const onlineStatus = allUsers.some(
                (user) => onlineUsers.includes(user.id) && user.id !== userId
              );

              const unread = unreadMessages.find((unreadMessage) => {
                return unreadMessage.participantId === currentParticipant?.id;
              });

              return (
                <ConvLink
                  key={conversation.id}
                  users={allUsers}
                  href={`/home/conversations/${conversation.id}`}
                  status={onlineStatus}
                  id={conversation.id}
                  unreadMessages={unread ? unread.messages : []}
                />
              );
            })
          ) : (
            <div className="w-full flex flex-col items-center justify-center mt-2 rounded-md">
              <p className="text-gray-300 text-sm font-medium">
                No conversations yet
              </p>
              <EnvelopeIcon className="w-6 text-gray-400" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
