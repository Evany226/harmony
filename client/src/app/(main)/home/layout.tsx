import { getAllConversations } from "@/lib/conversations";
import { auth } from "@clerk/nextjs/server";

import HomeWrapper from "@/components/layout/HomeWrapper";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken } = auth();
  const token = await getToken();

  const data = await getAllConversations(token as string);

  return <HomeWrapper conversations={data}>{children}</HomeWrapper>;
}
