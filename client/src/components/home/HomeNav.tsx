"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeNav() {
  const router = useRouter();

  const links = [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Customers",
      href: "/customers",
    },
    {
      name: "Support",
      href: "/support",
    },
  ];

  return (
    <div className="w-3/4 h-full flex items-center justify-between ml-auto mr-auto md:w-full md:px-4 ">
      <section className="flex items-center">
        <Image src="/images/logo-past.png" width={45} height={45} alt="Logo" />
        <h1 className="text-xl text-gray-300 font-semibold ml-2">Harmony</h1>
      </section>
      <nav className="sm:hidden">
        <ul className="flex space-x-4">
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-2.5 py-1 rounded-md hover:bg-zinc-800`}
              >
                <p className="text-gray-300 font-medium text-sm">{link.name}</p>
              </Link>
            );
          })}
        </ul>
      </nav>
      <section className="flex justify-end items-center space-x-2">
        <button
          onClick={() => router.push("/sign-in")}
          className="px-3 py-1 rounded-md hover:bg-zinc-800"
        >
          <p className="text-gray-300 font-medium text-sm sm:text-xs">Log in</p>
        </button>
        <button
          onClick={() => router.push("/sign-up")}
          className="bg-indigo-600 px-3 py-1 rounded-md"
        >
          <p className="text-gray-300 font-medium text-sm sm:text-xs">
            Sign up
          </p>
        </button>
      </section>
    </div>
  );
}
