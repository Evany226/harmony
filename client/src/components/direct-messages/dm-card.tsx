import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "@heroicons/react/16/solid";

export function DirectMessage({ name }: { name: string }) {
  return (
    <div className="flex items-center w-full h-10">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>EY</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-gray-400 ml-3">{name}</h2>
      </div>
    </div>
  );
}

export default function DirectMessageWrapper() {
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
  ];

  return (
    <div>
      <article className="flex-col w-full max-h-full p-2 mt-4">
        <div className="flex justify-between">
          <h2 className="text-gray-400 text-sm font-medium">Direct Messages</h2>
          <PlusIcon className="w-4 text-gray-400" />
        </div>

        <div className="flex-col mt-3 space-y-3">
          {users.map((user) => {
            return <DirectMessage key={user.userName} name={user.userName} />;
          })}
        </div>
      </article>
    </div>
  );
}
