"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  GoogleIcon,
  MetaIcon,
  NetflixIcon,
  AppleIcon,
  SamsungIcon,
  NvidiaIcon,
  SteamIcon,
  DiscordIcon,
} from "@/assets/icons/BrandIcons";

export default function Home() {
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
    <main className="flex h-screen w-full flex-col items-center bg-neutral-900">
      <div className="w-full h-16 bg-zinc-900 border-b border-zinc-800">
        <div className="w-3/4 h-full flex items-center justify-between ml-auto mr-auto ">
          <section className="flex items-center">
            <Image
              src="/images/logo-past.png"
              width={45}
              height={45}
              alt="Logo"
            />
            <h1 className="text-xl text-gray-300 font-semibold ml-2">
              Harmony
            </h1>
          </section>
          <nav className="">
            <ul className="flex space-x-4">
              {links.map((link) => {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-2.5 py-1 rounded-md hover:bg-zinc-800`}
                  >
                    <p className="text-gray-300 font-medium text-sm">
                      {link.name}
                    </p>
                  </Link>
                );
              })}
            </ul>
          </nav>
          <section className="flex justify-end items-center space-x-2">
            <button
              onClick={() => router.push("/sign-in")}
              className="px-3 py-1 rounded-md"
            >
              <p className="text-gray-300 font-medium text-sm">Log in</p>
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className="bg-indigo-600 px-3 py-1 rounded-md"
            >
              <p className="text-gray-300 font-medium text-sm">Sign up</p>
            </button>
          </section>
        </div>
      </div>

      <div className="h-full w-full rounded-sm flex flex-col bg-neutral-900">
        <section className="w-full h-3/4 flex ml-auto mr-auto">
          <main className="w-3/4 h-full flex items-center justify-center ml-auto mr-auto space-x-4">
            <div className="flex-col items-center space-y-6">
              <h1 className="text-5xl text-gray-300 font-bold">
                Design system <br></br> infrastructure for <br></br> modern
                teams
              </h1>
              <p className="text-gray-400 font-medium">
                With Harmonys versaility, product teams release better <br></br>
                experiences fsater while staying in sync with their <br></br>{" "}
                companys design system.
              </p>
              <div className="flex items-center space-x-2">
                <button className="bg-indigo-600 px-4 py-2 rounded-md">
                  <p className="text-gray-300 font-medium text-sm">
                    Get started
                  </p>
                </button>
                <button className="px-2 py-2 rounded-md">
                  <p className="text-gray-300 font-medium text-sm">
                    Read our vision
                  </p>
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <Image
                src="/images/main.svg"
                width={600}
                height={600}
                alt="Home Graphic"
              />
            </div>
          </main>
        </section>
        <section className="w-full h-1/4 flex-col">
          <div className="w-full h-1/4 flex items-center justify-center">
            <p className="text-gray-300 font-medium">
              Already endorsed by these product teams
            </p>
          </div>
          <div className="h-3/4 w-1/2 flex flex-grow items-center justify-center ml-auto mr-auto space-x-12">
            <GoogleIcon className="w-12 h-12" />
            <NetflixIcon className="w-12 h-12" />
            <MetaIcon className="w-12 h-12" />
            <AppleIcon className="w-12 h-12" />
            <SamsungIcon className="w-12 h-12" />
            <NvidiaIcon className="w-12 h-12" />
            <SteamIcon className="w-12 h-12" />
            <DiscordIcon className="w-12 h-12" />
          </div>
        </section>
      </div>

      {/* <article className="bgup h-1/2 w-1/2 mt-4 rounded-sm flex items-center justify-center"></article> */}
    </main>
  );
}
