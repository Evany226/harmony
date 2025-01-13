"use client";
import { PlusIcon, EnvelopeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Conversation, User } from "@/types/index";

import ConvDropdown from "./ConvDropdown";
import ConnectionStatus from "../global/ConnectionStatus";
import { useSocket } from "@/context/SocketContext";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useNotification } from "@/context/NotificationContext";

interface ConvLinkProps {
  users: User[];
  href: string;
  status: boolean;
  id: string;
  unreadMessages: number;
}

interface ConvLinkWrapperProps {
  conversations: Conversation[];
}

export function ConvLink({
  users,
  href,
  status,
  id,
  unreadMessages,
}: ConvLinkProps) {
  const { userId } = useAuth();
  const pathname = usePathname();

  //if its a dm between 2 people, header shows single image, if group chat, show multiple images
  const header =
    users.length === 2
      ? users.find((user) => user.id !== userId)?.username || ""
      : users.map((user) => user.username).join(", ");

  const otherUser =
    users.length === 2 ? users.find((user) => user.id !== userId) : null;
  const singleAvatar = otherUser?.imageUrl;
  const isMultiUser = users.length > 1 && users.length !== 2;

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
        <div className="relative min-w-10 h-10 flex items-center justify-center">
          {isMultiUser ? (
            <>
              <div
                className={`rounded-full group-hover:border-neutral-800 w-8 h-8 absolute top-0 left-0 border-2 ${
                  pathname == href ? "border-zinc-700" : "border-neutral-900"
                }`}
              >
                <Image
                  src={users[0].imageUrl}
                  alt="Conv profile picture"
                  fill
                  className="rounded-full"
                />
              </div>

              <div
                className={`rounded-full group-hover:border-neutral-800 w-7 h-7 absolute bottom-0 right-0 border-2 ${
                  pathname == href ? "border-zinc-700" : "border-neutral-900"
                }`}
              >
                <Image
                  src={users[1].imageUrl}
                  alt="Conv profile picture"
                  fill
                  className="rounded-full"
                />
              </div>
              <ConnectionStatus isConnected={status} />
            </>
          ) : (
            <div className="w-9 h-9 absolute">
              <Image
                src={singleAvatar ?? ""}
                alt="Conv profile picture"
                fill
                className="rounded-full"
              />
              <ConnectionStatus isConnected={status} />
            </div>
          )}
        </div>
        <div className="flex items-center ml-3 w-full overflow-hidden relative">
          <p className="text-base text-gray-300 font-medium overflow-hidden whitespace-nowrap text-ellipsis">
            {header}
          </p>

          {unreadMessages > 0 && (
            <div className="absolute right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border border-zinc-950">
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
  const { userId } = useAuth();
  const { getCurrentUnreadMessages } = useNotification();

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

              return (
                <ConvLink
                  key={conversation.id}
                  users={allUsers}
                  href={`/home/conversations/${conversation.id}`}
                  status={onlineStatus}
                  id={conversation.id}
                  unreadMessages={getCurrentUnreadMessages(conversation.id)}
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
