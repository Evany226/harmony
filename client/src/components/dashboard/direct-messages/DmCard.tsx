"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Conversation, User } from "@/types/index";
import { useUser } from "@clerk/nextjs";
import DmCardSkeleton from "@/components/skeletons/DmCardSkeleton";

interface DirectMessageProps {
  users: User[];
  href: string;
}

interface DirectMessageWrapperProps {
  conversations: Conversation[];
}

export function DirectMessage({ users, href }: DirectMessageProps) {
  const pathname = usePathname();

  return (
    <>
      {users.length > 0 ? (
        <Link href={href}>
          <div
            className={`flex items-center w-full bg-neutral-900 px-2 py-2 mt-1 rounded-sm hover:bg-neutral-800 cursor-pointer ${
              pathname == href ? "bg-zinc-700" : ""
            }`}
          >
            <Avatar>
              <AvatarImage src={users[0].imageUrl} />
              <AvatarFallback>EY</AvatarFallback>
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
        <DmCardSkeleton />
      )}
    </>
  );
}

export default function DirectMessageWrapper({
  conversations,
}: DirectMessageWrapperProps) {
  const { user: currentUser } = useUser(); // renames user to currentUser by destructure

  return (
    <>
      <section className="flex-col w-full max-h-full mt-4">
        <div className="flex justify-between">
          <h2 className="text-gray-400 text-sm font-medium">Direct Messages</h2>
          <PlusIcon className="w-4 text-gray-400" />
        </div>

        <div className="flex-col mt-3">
          {conversations.map((conversation) => {
            const newUsers = conversation.users.filter(
              (user) => currentUser && currentUser.id !== user.id
            );

            return (
              <DirectMessage
                key={conversation.id}
                users={newUsers}
                href={`/conversations/${conversation.id}`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
