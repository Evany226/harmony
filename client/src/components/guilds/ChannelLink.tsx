"use client";

import { TextChannel } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HashtagIcon } from "@heroicons/react/24/solid";

interface ChannelLinkProps {
  channel: TextChannel;
  href: string;
}

export default function ChannelLink({ channel, href }: ChannelLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`group py-1 rounded-sm hover:bg-neutral-800 flex items-center px-2 ${
        pathname == href ? "bg-zinc-700" : ""
      }`}
    >
      <HashtagIcon className="w-4 text-gray-300 cursor-pointer" />
      <p
        className={`text-sm font-medium ml-2 group-hover:text-white ${
          pathname == href ? "text-white" : "text-zinc-400 "
        }`}
      >
        {channel.name}
      </p>
    </Link>
  );
}
