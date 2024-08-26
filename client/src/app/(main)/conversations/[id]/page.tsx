import { getConversation } from "@/lib/conversations";
import { auth } from "@clerk/nextjs/server";
import { User } from "@/types/index.js";

export default async function Conversation({
  params,
}: {
  params: { id: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const data = await getConversation(token as string, params.id);

  const users = data.users.map((user: User) => user.username).join(", ");

  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center">
        {users}
      </header>
      <p>This is a conversation page{params.id}</p>;<p>{data.id}</p>
      <p>{data.createdAt}</p>
    </>
  );
}
