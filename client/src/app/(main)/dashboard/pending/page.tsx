import { getPending } from "@/lib/utils";
import FriendsWrapper from "@/components/dashboard/friends/FriendsCard";
import { auth } from "@clerk/nextjs/server";

export default async function Pending() {
  const { getToken } = auth();
  const token = await getToken();
  const data = await getPending(token as string);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 border-r border-zinc-800">
        <FriendsWrapper friends={data} pending={true} title="Pending" />
      </div>
    </div>
  );
}
