import React from "react";

import { SocketProvider } from "@/context/SocketContext";
import { VoiceCallProvider } from "@/context/VoiceCallContext";
import SideNavWrapper from "@/components/nav/SideNavWrapper";

import { GuildProvider } from "@/context/GuildContext";

import { VoiceRoomProvider } from "@/context/VoiceRoomContext";

import { AudioProvider } from "@/context/AudioContext";
import dynamic from "next/dynamic";
import { getAllUnreadMessages } from "@/lib/conversations";
import { NotificationProvider } from "@/context/NotificationContext";
import { auth } from "@clerk/nextjs/server";
import { getAllFriends } from "@/lib/friends";
import { FriendProvider } from "@/context/FriendContext";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const VoiceChannelOverlay = dynamic(
    () => import("@/components/conference/VoiceChannelOverlay"),
    { ssr: false }
  );

  const { getToken } = auth();

  const token = await getToken();

  const [unreadMessages, allFriends] = await Promise.all([
    getAllUnreadMessages(token as string),
    getAllFriends(token as string),
  ]);

  return (
    <AudioProvider>
      <VoiceCallProvider>
        <GuildProvider>
          <VoiceRoomProvider>
            <SocketProvider>
              <FriendProvider initialFriends={allFriends}>
                <NotificationProvider initialMessages={unreadMessages}>
                  <main className="flex w-full h-[100vh] bg-gray-100 relative">
                    <SideNavWrapper />
                    <VoiceChannelOverlay />
                    {children}
                  </main>
                </NotificationProvider>
              </FriendProvider>
            </SocketProvider>
          </VoiceRoomProvider>
        </GuildProvider>
      </VoiceCallProvider>
    </AudioProvider>
  );
}
