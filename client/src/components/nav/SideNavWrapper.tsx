// import Image from "next/image";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import Link from "next/link";
import { getAllGuilds } from "@/lib/guilds";
import { auth } from "@clerk/nextjs/server";
// import { Guild, Category } from "@/types";
// import CreateGuildDialog from "../guilds/CreateGuildDialog";
// import SideNavTooltip from "./SideNavTooltip";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Skeleton } from "../ui/skeleton";
// import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import SideNav from "./SideNav";
import { getAllUnreadMessages } from "@/lib/conversations";

export default async function SideNavWrapper() {
  const { getToken } = auth();
  const user = await currentUser();

  const token = await getToken();

  const unreadMessages = await getAllUnreadMessages(token as string);

  const guilds = await getAllGuilds(token as string);

  return <SideNav unreadMessages={unreadMessages} guilds={guilds} />;
}
