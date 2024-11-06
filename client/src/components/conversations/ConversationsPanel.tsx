import FriendsNavButton from "../dashboard/friends/FriendsNavButton";
import GuildNavButton from "../dashboard/guild-requests/GuildNavButton";
import ConvLinkWrapper from "./ConvLink";
import ProfileCard from "../dashboard/profile/ProfileCard";
import { getAllConversations } from "@/lib/conversations";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function ConversationsPanel() {
  const { getToken } = auth();
  const user = await currentUser();
  const token = await getToken();
  const data = await getAllConversations(token as string);

  return (
    <div className="flex flex-col min-w-64 max-w-64 h-full bg-neutral-900 border-x border-zinc-800 relative">
      <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-3">
        <input
          className="outline-0 rounded-sm w-full bg-zinc-800 text-xs py-1 px-2"
          placeholder="Find or start a conversation"
        ></input>
      </header>

      <div className="flex flex-col p-3 max-w-64">
        <FriendsNavButton />
        <GuildNavButton />
        <ConvLinkWrapper conversations={data} />
      </div>

      <ProfileCard />
    </div>
  );
}
