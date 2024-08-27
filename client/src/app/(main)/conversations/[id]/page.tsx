import { getConversation } from "@/lib/conversations";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/types/index.js";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ChatInput from "@/components/conversations/ChatInput";
import ConvEmptyState from "@/components/empty-states/ConvEmptyState";
import MessageCard from "@/components/conversations/MessageCard";

export default async function Conversation({
  params,
}: {
  params: { id: string };
}) {
  const currUser = await currentUser();

  if (!currUser) return <div>Not signed in</div>;

  const { getToken } = auth();
  const token = await getToken();
  const data = await getConversation(token as string, params.id);

  const users = data.users.filter((user: User) => user.id !== currUser.id);
  const header = users.map((user: User) => user.username).join(", ");

  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center ">
        <Avatar className="w-7 h-7 ml-2">
          <AvatarImage src={users[0].imageUrl} />
          <AvatarFallback>EY</AvatarFallback>
        </Avatar>
        <h1 className="text-gray-300 font-semibold">{header}</h1>
      </header>

      <main className="w-full h-[calc(100%-3rem)] flex flex-col">
        <article className="w-3/4 h-full border-r border-zinc-800 flex flex-col relative px-5">
          <div className="h-full w-full flex flex-col overflow-y-auto mb-4">
            <ConvEmptyState name={header} imageUrl={users[0].imageUrl} />
            <MessageCard
              name={"dankmemepepelord"}
              message={"hello gamer"}
              imageUrl={users[0].imageUrl}
            />
            <MessageCard
              name={"dankmemepepelord"}
              message={"hello gamer"}
              imageUrl={users[0].imageUrl}
            />
            <MessageCard
              name={"dankmemepepelord"}
              message={"hello gamer"}
              imageUrl={users[0].imageUrl}
            />
            <MessageCard
              name={"dankmemepepelord"}
              message={"hello gamer"}
              imageUrl={users[0].imageUrl}
            />
            <MessageCard
              name={"dankmemepepelord"}
              message={"hello gamer"}
              imageUrl={users[0].imageUrl}
            />
            <MessageCard
              name={"dankmemepepelord"}
              message={"hello gamer"}
              imageUrl={users[0].imageUrl}
            />
            <MessageCard
              name={"dankmemepepelord"}
              message={"yolo"}
              imageUrl={users[0].imageUrl}
            />
            <MessageCard
              name={"dankmemepepelord"}
              message={"lol"}
              imageUrl={users[0].imageUrl}
            />
          </div>
          <ChatInput />
        </article>
      </main>
    </>
  );
}
