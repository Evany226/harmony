"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DirectMessageProps {
  name: string;
  href: string;
}

export function DirectMessage({ name, href }: DirectMessageProps) {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <div
        className={`flex items-center w-full bg-neutral-900 px-2 py-2 mt-1 rounded-sm hover:bg-neutral-800 cursor-pointer ${
          pathname == href ? "bg-zinc-700" : ""
        }`}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>EY</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-gray-300 ml-3">{name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default function DirectMessageWrapper() {
  const users = [
    {
      requestId: "1",
      id: "user_1234",
      username: "flappybird45",
      hasImage: true,
      imageUrl: "https://github.com/shadcn.png",
    },
    {
      requestId: "2",
      id: "user_2343",
      username: "dogeater96",
      hasImage: true,
      imageUrl: "https://github.com/shadcn.png",
    },
    {
      requestId: "3",
      id: "user_5674",
      username: "fishman12",
      hasImage: true,
      imageUrl: "https://github.com/shadcn.png",
    },
  ];

  return (
    <>
      <section className="flex-col w-full max-h-full mt-4">
        <div className="flex justify-between">
          <h2 className="text-gray-400 text-sm font-medium">Direct Messages</h2>
          <PlusIcon className="w-4 text-gray-400" />
        </div>

        <div className="flex-col mt-3">
          {users.map((user) => {
            return (
              <DirectMessage
                key={user.id}
                name={user.username}
                href={`/conversations/${user.id}`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
