import ConversationsPanel from "@/components/conversations/ConversationsPanel";
import { Suspense } from "react";
import PanelSkeleton from "@/components/skeletons/PanelSkeleton";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-[calc(100%-5.5rem)] h-full bg-zinc-900 sm:w-full">
      <Suspense fallback={<PanelSkeleton showOnMobile={false} />}>
        <ConversationsPanel showOnMobile={false} />
      </Suspense>

      <div className="flex flex-col w-[100%] h-full bg-zinc-900 ">
        {children}
      </div>
    </section>
  );
}
