"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      name: "Online",
      href: "/dashboard",
    },
    {
      name: "All",
      href: "/dashboard/all",
    },
    {
      name: "Pending",
      href: "/dashboard/pending",
    },
    {
      name: "Blocking",
      href: "/dashboard/blocked",
    },
  ];

  return (
    <>
      <div className="flex items-center space-x-2">
        <UserIcon className="text-gray-300 w-5" />
        <h1 className="text-gray-300 text-sm font-medium">Friends</h1>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center space-x-5">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-2.5 py-1 rounded-md ${
                pathname === link.href ? "bg-zinc-700" : ""
              }`}
            >
              <p className="text-gray-300 font-normal text-sm">{link.name}</p>
            </Link>
          );
        })}

        <Button variant="outline" size="default">
          Add Friend
        </Button>
      </div>
    </>
  );
}
