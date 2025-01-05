"use client";

import ConversationsPanel from "@/components/conversations/ConversationsPanel";
import PanelSkeleton from "@/components/skeletons/PanelSkeleton";
import { Suspense } from "react";
import { Conversation, UnreadMessage } from "@/types";
import { usePathname } from "next/navigation";

export default function HomeWrapper({
  children,
  conversations,
  unreadMessages,
}: {
  children: React.ReactNode;
  conversations: Conversation[];
  unreadMessages: UnreadMessage[];
}) {
  const pathname = usePathname();
  const mobileRoutes = ["/home/friends"];

  const showOnMobile = mobileRoutes.some((route) => pathname.includes(route));

  return (
    <section
      className={`flex w-[calc(100%-5.5rem)] h-full bg-zinc-900 ${
        showOnMobile ? "" : "sm:w-full"
      }`}
    >
      {/* <PanelSkeleton showOnMobile={false} /> */}
      <ConversationsPanel
        conversations={conversations}
        unreadMessages={unreadMessages}
        showOnMobile={showOnMobile}
      />
      {children}
    </section>
  );
}
