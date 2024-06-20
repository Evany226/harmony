import { PlusIcon, UserIcon } from "@heroicons/react/16/solid";
import DirectMessage from "@/components/direct-messages/dm-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <section className="flex w-full h-full bg-zinc-900">
      <div className="flex flex-col w-64 h-full bg-neutral-900 border-x border-zinc-700">
        <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-700 px-3">
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

          <article className="flex-col w-full max-h-full p-2 mt-4">
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
      </div>

      <div className="flex flex-col w-full h-full bg-zinc-900">
        <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-700 px-2 py-3 space-x-3 items-center">
          <div className="flex items-center space-x-2">
            <UserIcon className="text-gray-300 w-5" />
            <h1 className="text-gray-300 text-sm font-medium">Friends</h1>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center space-x-5">
            <div className="text-gray-300 font-normal text-sm">Online</div>
            <div className="text-gray-300 font-normal text-sm">All</div>
            <div className="text-gray-300 font-normal text-sm">Pending</div>
            <div className="text-gray-300 font-normal text-sm">Blocked</div>
            <Button variant="outline" size="default">
              Add Friend
            </Button>
          </div>
        </header>
      </div>
    </section>
  );
}
