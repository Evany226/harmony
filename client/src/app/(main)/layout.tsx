import React from "react";
import SideNav from "@/components/nav/SideNav";
import { UserIcon } from "@heroicons/react/16/solid";
import DirectMessageWrapper from "@/components/direct-messages/DmCard";

import ProfileCard from "@/components/profile/ProfileCard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full h-[100vh] bg-gray-100">
      <SideNav />
      {children}
    </main>
  );
}
