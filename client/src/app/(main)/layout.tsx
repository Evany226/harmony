import React from "react";
import SideNav from "@/components/nav/SideNav";

export default function MainLayout({
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
