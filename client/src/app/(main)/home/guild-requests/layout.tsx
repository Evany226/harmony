import GuildNavLinks from "@/components/dashboard/guild-requests/GuildNavLinks";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function GuildRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-[100%] h-full bg-zinc-900 ">
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center">
        <Link href="/home/friends" className="hidden sm:block">
          <ArrowUturnLeftIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 cursor-pointer" />
        </Link>
        <GuildNavLinks />
      </header>
      {children}
    </div>
  );
}
