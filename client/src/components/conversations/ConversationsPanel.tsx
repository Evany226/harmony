"use client";

import FriendsNavButton from "../dashboard/friends/FriendsNavButton";
import GuildNavButton from "../dashboard/guild-requests/GuildNavButton";
import ConvLinkWrapper from "./ConvLink";
import ProfileCard from "../dashboard/profile/ProfileCard";
import { Conversation, UnreadMessage } from "@/types";

export default function ConversationsPanel({
  conversations,
  unreadMessages,
  showOnMobile,
}: {
  conversations: Conversation[];
  unreadMessages: UnreadMessage[];
  showOnMobile: boolean;
}) {
  return (
    <div
      className={`flex flex-col min-w-64 h-full bg-neutral-900 border-r border-zinc-800 relative ${
        showOnMobile ? "sm:w-full" : "sm:w-0 sm:hidden"
      }`}
    >
      <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-3">
        <input
          className="outline-0 rounded-sm w-full bg-zinc-800 text-xs py-1 px-2"
          placeholder="Find or start a conversation"
        ></input>
      </header>

      <div className="flex flex-col p-3 w-full">
        <FriendsNavButton />
        <GuildNavButton />
        <ConvLinkWrapper
          conversations={conversations}
          unreadMessages={unreadMessages}
        />
      </div>

      <ProfileCard />
    </div>
  );
}
