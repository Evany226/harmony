"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Conversation, User } from "@/types/index";
import { useUser } from "@clerk/nextjs";
import ConvLinkSkeleton from "@/components/skeletons/ConvLinkSkeleton";
import ConvDropdown from "../global/ConvDropdown";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

interface ConvLinkProps {
  users: User[];
  href: string;
}

interface ConvLinkWrapperProps {
  conversations: Conversation[];
}

export function ConvLink({ users, href }: ConvLinkProps) {
  const pathname = usePathname();

  return (
    <>
      {users ? (
        <Link href={href}>
          <div
            className={`flex items-center w-full bg-neutral-900 px-2 py-2 mt-1 rounded-sm hover:bg-neutral-800 cursor-pointer ${
              pathname == href ? "bg-zinc-700" : ""
            }`}
          >
            <Avatar>
              <AvatarImage src={users[0].imageUrl} />
              <AvatarFallback>
                <Skeleton className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex ml-3 overflow-x-hidden max-w-full">
              {users.map((user, index) => {
                return (
                  <p
                    key={user.id}
                    className="text-base text-gray-300 font-medium"
                  >
                    {user.username}
                    {index < users.length - 1 && users.length > 1 && ", "}
                  </p>
                );
              })}
            </div>
          </div>
        </Link>
      ) : (
        <p className="text-gray-300">TEST</p>
      )}
    </>
  );
}

export default function ConvLinkWrapper({
  conversations,
}: ConvLinkWrapperProps) {
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
            return (
              <ConvLink
                key={conversation.id}
                users={conversation.users}
                href={`/conversations/${conversation.id}`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
