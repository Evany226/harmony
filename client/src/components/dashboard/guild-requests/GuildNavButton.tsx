"use client";
import { UsersIcon } from "@heroicons/react/16/solid";
import { usePathname, useRouter } from "next/navigation";

export default function GuildNavButton() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/home/guild-requests/pending")}
      className={`flex items-center w-full p-2 rounded-sm border border-zinc-700 cursor-pointer mt-2 ${
        pathname.includes("/home/guild-requests") ? "bg-zinc-700" : ""
      }`}
    >
      <UsersIcon className="w-6 text-gray-300" />
      <h2 className="text-gray-300 font-semibold ml-3">Guild Requests</h2>
    </button>
  );
}
