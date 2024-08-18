import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/16/solid";
import { Separator } from "../ui/separator";

export function Friends({ name }: { name: string }) {
  return (
    <div className="flex flex-col w-full bg-zinc-900 rounded-sm hover:bg-zinc-800 group cursor-pointer">
      <main className="flex items-center w-full justify-between">
        <div className="flex items-center w-full py-3 px-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>EY</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-gray-400 ml-3">{name}</h2>
          </div>
        </div>

        <aside className="flex items-center space-x-2 mr-2">
          <div className="bg-zinc-800 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900">
            <ChatBubbleOvalLeftIcon className="w-6 text-gray-400" />
          </div>
          <div className="bg-zinc-800 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900">
            <EllipsisVerticalIcon className="w-6 text-gray-400" />
          </div>
        </aside>
      </main>
      <Separator orientation="horizontal" />
    </div>
  );
}

export default function FriendsWrapper() {
  const users = [
    {
      userName: "Evan Yang",
      picture: "https://github.com/shadcn.png",
    },
    {
      userName: "Donald Trump",
      picture: "https://github.com/shadcn.png",
    },
    {
      userName: "Bubblyfishy",
      picture: "https://github.com/shadcn.png",
    },
    {
      userName: "John Deer",
      picture: "https://github.com/shadcn.png",
    },
  ];

  return (
    <>
      <section className="flex-col w-full h-full">
        <div className="flex flex-col justify-start">
          <h2 className="text-gray-400 text-sm font-medium mb-2 ml-2">
            Online - {users.length}
          </h2>
          <Separator orientation="horizontal" />
        </div>

        <div className="flex-col">
          {users.map((user) => {
            return <Friends key={user.userName} name={user.userName} />;
          })}
        </div>
      </section>
    </>
  );
}
