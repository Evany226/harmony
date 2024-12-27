import GuildRequestWrapper from "@/components/dashboard/guild-requests/GuildRequestCard";
import { getPendingGuildReq } from "@/lib/guilds";
import { auth } from "@clerk/nextjs/server";

export default async function PendingGuildRequests() {
  const { getToken } = auth();
  const token = await getToken();
  const pendingRequests = await getPendingGuildReq(token as string);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3 ">
        <GuildRequestWrapper pendingRequests={pendingRequests} />
      </div>
    </div>
  );
}
