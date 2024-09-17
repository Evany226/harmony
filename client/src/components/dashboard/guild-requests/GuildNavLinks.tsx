"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UsersIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function GuildNavLinks() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      name: "Pending",
      href: "/guild-requests/pending",
    },
  ];

  return (
    <>
      <div className="flex items-center space-x-2">
        <UsersIcon className="text-gray-300 w-5" />
        <h1 className="text-gray-300 text-sm font-medium">Guild Requests</h1>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center space-x-4">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-2.5 py-1 rounded-md hover:bg-zinc-800 ${
                pathname === link.href ? "bg-zinc-700" : ""
              }`}
            >
              <p className="text-gray-300 font-normal text-sm">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
