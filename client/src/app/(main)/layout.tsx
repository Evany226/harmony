import React from "react";
import SideNav from "@/components/nav/side-nav";

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
