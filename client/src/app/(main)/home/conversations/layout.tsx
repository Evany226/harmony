import ConversationsPanel from "@/components/conversations/ConversationsPanel";
import { Suspense } from "react";
import PanelSkeleton from "@/components/skeletons/PanelSkeleton";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-[100%] h-full bg-zinc-900 ">{children}</div>
  );
}
