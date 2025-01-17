"use client";
import { UserIcon } from "@heroicons/react/16/solid";
import { usePathname, useRouter } from "next/navigation";

export default function FriendsNavButton() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/home/friends")}
      className={`flex items-center w-full p-2 rounded-sm border border-zinc-700 cursor-pointer ${
        pathname.includes("/home/friends") ? "bg-zinc-700" : ""
      }`}
    >
      <UserIcon className="w-6 text-gray-300" />
      <h2 className="text-gray-300 font-semibold ml-3">Friends</h2>
    </button>
  );
}
