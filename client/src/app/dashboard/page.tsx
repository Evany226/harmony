import SideNav from "@/components/nav/side-nav";
import { PlusIcon } from "@heroicons/react/16/solid";
import DirectMessage from "@/components/direct-messages/dm-card";

export default function Dashboard() {
  return (
    <main className="flex w-full h-[100vh] bg-gray-100">
      <SideNav />
      <section className="flex w-full h-full bg-zinc-900">
        <div className="flex flex-col w-64 h-full bg-neutral-900 border-x border-zinc-700">
          <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-700 px-3">
            <input
              className="outline-0 rounded-sm w-full bg-zinc-800 text-xs py-1 px-2"
              placeholder="Find or start a conversation"
            ></input>
          </header>
          <article className="flex-col w-full max-h-full p-4">
            <div className="flex justify-between">
              <h2 className="text-gray-400 text-sm font-medium">
                Direct Messages
              </h2>
              <PlusIcon className="w-4 text-gray-400" />
            </div>

            <div className="flex-col mt-3 space-y-3">
              <DirectMessage />
              <DirectMessage />
              <DirectMessage />
            </div>
          </article>
        </div>

        <div className="flex flex-col w-full h-full bg-zinc-900">
          <header className="w-full h-12 bg-zinc-900 border-b border-zinc-700"></header>
        </div>
      </section>
    </main>
  );
}
