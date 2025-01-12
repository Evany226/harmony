import { getAllGuilds } from "@/lib/guilds";
import { auth } from "@clerk/nextjs/server";
import SideNav from "./SideNav";

export default async function SideNavWrapper() {
  const { getToken } = auth();

  const token = await getToken();

  const guilds = await getAllGuilds(token as string);

  return <SideNav guilds={guilds} />;
}
