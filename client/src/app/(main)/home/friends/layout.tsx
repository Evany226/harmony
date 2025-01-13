import FriendNavLinks from "@/components/dashboard/friends/FriendNavLinks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full bg-zinc-900 sm:w-0 sm:hidden">
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center ">
        <FriendNavLinks />
      </header>
      {children}
    </div>
  );
}
