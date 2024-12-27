import FriendNavLinks from "@/components/dashboard/friends/FriendNavLinks";
import ConversationsPanel from "@/components/conversations/ConversationsPanel";
import { Suspense } from "react";
import PanelSkeleton from "@/components/skeletons/PanelSkeleton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full h-full bg-zinc-900">
      <Suspense fallback={<PanelSkeleton showOnMobile={true} />}>
        <ConversationsPanel showOnMobile={true} />
      </Suspense>

      <div className="flex flex-col w-full h-full bg-zinc-900 sm:w-0 sm:hidden">
        <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center ">
          <FriendNavLinks />
        </header>
        {children}
      </div>
    </section>
  );
}
