import { getAllGuilds } from "@/lib/guilds";
import { auth } from "@clerk/nextjs/server";
import SideNav from "./SideNav";
import { getAllUnreadMessages } from "@/lib/conversations";

export default async function SideNavWrapper() {
  const { getToken } = auth();

  const token = await getToken();

  const unreadMessages = await getAllUnreadMessages(token as string);

  const guilds = await getAllGuilds(token as string);

  return <SideNav unreadMessages={unreadMessages} guilds={guilds} />;
}
