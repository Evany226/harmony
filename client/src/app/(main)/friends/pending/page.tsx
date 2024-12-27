import { getPending } from "@/lib/friends";
import FriendsWrapper from "@/components/dashboard/friends/FriendsCard";
import { auth } from "@clerk/nextjs/server";

export default async function Pending() {
  const { getToken } = auth();
  const token = await getToken();
  const data = await getPending(token as string);

  return (
    <div className="flex flex-col items-center w-3/4 h-full py-3 overflow-y-hidden">
      <FriendsWrapper friends={data} variant="Pending" />
    </div>
  );
}
