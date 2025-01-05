import { getAllConversations } from "@/lib/conversations";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getAllUnreadMessages } from "@/lib/conversations";
import HomeWrapper from "@/components/layout/HomeWrapper";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken } = auth();
  const token = await getToken();

  const data = await getAllConversations(token as string);

  const unreadMessages = await getAllUnreadMessages(token as string);

  return (
    <HomeWrapper conversations={data} unreadMessages={unreadMessages}>
      {children}
    </HomeWrapper>
  );
}
