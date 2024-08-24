import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Separator } from "../ui/separator";
import { User } from "@/types/index";
import Image from "next/image";
import { TooltipWrapper } from "../global/TooltipWrapper";

interface FriendsProps {
  name: string;
  src: string;
  pending: boolean;
}

interface FriendsWrapperProps {
  users: User[];
  pending: boolean;
  title: string;
}

export function Friends({ name, src, pending }: FriendsProps) {
  return (
    <div className="flex flex-col w-full bg-zinc-900 rounded-sm hover:bg-zinc-800 group cursor-pointer">
      <main className="flex items-center w-full justify-between">
        <div className="flex items-center w-full py-3 px-2">
          <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback>EY</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-gray-400 ml-3">{name}</h2>
          </div>
        </div>

        <aside className="flex items-center mr-2">
          {pending ? (
            <>
              <TooltipWrapper text="Accept">
                <div className="bg-zinc-800 mr-2 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900">
                  <CheckIcon className="w-6 text-gray-400" />
                </div>
              </TooltipWrapper>
              <TooltipWrapper text="Reject">
                <div className="bg-zinc-800 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900">
                  <XMarkIcon className="w-6 text-gray-400" />
                </div>
              </TooltipWrapper>
            </>
          ) : (
            <>
              <TooltipWrapper text="Message">
                <div className="bg-zinc-800 mr-2 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900">
                  <ChatBubbleOvalLeftIcon className="w-6 text-gray-400" />
                </div>
              </TooltipWrapper>

              <TooltipWrapper text="More">
                <div className="bg-zinc-800 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900">
                  <EllipsisVerticalIcon className="w-6 text-gray-400" />
                </div>
              </TooltipWrapper>
            </>
          )}
        </aside>
      </main>
      <Separator orientation="horizontal" />
    </div>
  );
}

export default function FriendsWrapper({
  users,
  pending,
  title,
}: FriendsWrapperProps) {
  return (
    <>
      <section className="flex-col w-full h-full">
        <div className="flex flex-col justify-start">
          <h2 className="text-gray-400 text-sm font-medium mb-2 ml-2">
            {title} - {users.length}
          </h2>
          <Separator orientation="horizontal" />
        </div>

        <div className="flex-col">
          {users.map((user) => {
            return (
              <Friends
                key={user.id}
                name={user.username}
                src={user.imageUrl}
                pending={pending}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
