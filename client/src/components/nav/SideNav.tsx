import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SideNav() {
  const servers = [
    { href: "/guilds/abc" },
    { href: "/guilds/123" },
    { href: "/guilds/xyz" },
  ];

  return (
    <ScrollArea className="flex-col h-full w-[5.5rem] fixed top-0 left-0 bg-zinc-900">
      <section className="flex flex-col items-center w-full justify-center mt-2 -b">
        <h1 className="text-gray-300 text-sm font-semibold">Harmony</h1>
        <Link href="/dashboard">
          <Image
            src="/logo-past.png"
            className="border-b border-zinc-600"
            width={60}
            height={60}
            alt="Logo"
          />
        </Link>
      </section>

      <section className="flex flex-col h-full w-full items-center mt-2">
        {servers.map((server) => (
          <Link href={server.href}>
            <Image src="/harmony-logo.png" width={60} height={60} alt="Logo" />
          </Link>
        ))}
        <PlusCircleIcon className="w-16 text-zinc-700 hover:text-zinc-600 cursor-pointer" />
      </section>
    </ScrollArea>
  );
}
