import { UserIcon } from "@heroicons/react/16/solid";
import DirectMessageWrapper from "@/components/direct-messages/dm-card";
import NavLinks from "@/components/nav/nav-links";
import ProfileCard from "@/components/profile/profile-card";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full h-full bg-zinc-900">
      <div className="flex flex-col w-64 h-full bg-neutral-900 border-x border-zinc-800 relative">
        <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-3">
          <input
            className="outline-0 rounded-sm w-full bg-zinc-800 text-xs py-1 px-2"
            placeholder="Find or start a conversation"
          ></input>
        </header>

        <div className="flex flex-col p-3">
          <article className="flex items-center w-full p-2 rounded-sm bg-zinc-700">
            <UserIcon className="w-6 text-gray-300" />
            <h2 className="text-gray-300 font-semibold ml-3">Friends</h2>
          </article>

          <DirectMessageWrapper />
        </div>

        <ProfileCard />
      </div>

      <div className="flex flex-col w-full h-full bg-zinc-900">
        <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center">
          <NavLinks />
        </header>
        {children}
      </div>
    </section>
  );
}
