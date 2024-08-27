import { getConversation } from "@/lib/conversations";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/types/index.js";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ChatInput from "@/components/conversations/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="w-full h-[calc(100%-3rem)] flex flex-col">
        <div className="w-3/4 h-full border-r border-zinc-800 flex flex-col relative px-4">
          <div className="flex-grow overflow-hidden pb-4">
            <ScrollArea className="h-full flex flex-col-reverse">
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>

              {/* ... more <p>Hello</p> elements ... */}
            </ScrollArea>
          </div>
          <ChatInput />
        </div>
      </div>
    </>
  );
}
