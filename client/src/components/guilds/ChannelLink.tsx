"use client";

import { TextChannel } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ChannelLinkProps {
  channel: TextChannel;
  href: string;
}

export default function ChannelLink({ channel, href }: ChannelLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`py-1 rounded-sm hover:bg-neutral-800 ${
        pathname == href ? "bg-zinc-700" : ""
      }`}
    >
      <p className="text-gray-300 text-sm ml-4 font-medium">{channel.name}</p>
    </Link>
  );
}
