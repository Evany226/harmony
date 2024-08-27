import NavLinks from "@/components/dashboard/friends/NavLinks";
import ConversationsPanel from "@/components/conversations/ConversationsPanel";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full h-full bg-zinc-900">
      <Suspense fallback={<div className="text-white">loading...</div>}>
        <ConversationsPanel />
      </Suspense>

      <div className="flex flex-col w-[100%] h-full bg-zinc-900 ">
        <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center">
          <NavLinks />
        </header>
        {children}
      </div>
    </section>
  );
}
