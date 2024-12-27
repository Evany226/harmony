"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function FriendNavLinks() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      name: "All",
      href: "/friends",
    },
    {
      name: "Online",
      href: "/friends/online",
    },
    {
      name: "Pending",
      href: "/friends/pending",
    },
    {
      name: "Blocking",
      href: "/friends/blocked",
    },
  ];

  return (
    <>
      <div className="flex items-center space-x-2">
        <UserIcon className="text-gray-300 w-5" />
        <h1 className="text-gray-300 text-sm font-medium">Friends</h1>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center space-x-4 md:space-x-2">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-2.5 py-1 rounded-md hover:bg-zinc-800${
                pathname === link.href ? "bg-zinc-700" : ""
              }`}
            >
              <p className="text-gray-300 font-normal text-sm">{link.name}</p>
            </Link>
          );
        })}

        <Button
          onClick={() => {
            router.push("/friends/add-friends");
          }}
          variant="outline"
          size="default"
          className="bg-indigo-600 text-gray-300 border-0 hover:bg-indigo-700 hover:text-gray-200"
        >
          Add Friend
        </Button>
      </div>
    </>
  );
}
