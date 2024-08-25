import ConversationsPanel from "@/components/dashboard/ConversationsPanel";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full h-full bg-zinc-900">
      <ConversationsPanel />

      <div className="flex flex-col w-[100%] h-full bg-zinc-900 ">
        {children}
      </div>
    </section>
  );
}
