"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import HomeNav from "@/components/home/HomeNav";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import data from "../../public/data/features.json";

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

  return (
    <>
      <main className="flex h-screen w-full flex-col items-center bg-neutral-900">
        <div className="w-full h-16 bg-zinc-900 border-b border-zinc-800">
          <HomeNav />
        </div>

        <div className="h-full w-full rounded-sm flex flex-col bg-neutral-900">
          <section className="w-full h-3/4 flex ml-auto mr-auto">
            <main className="w-3/4 h-full flex items-center justify-center ml-auto mr-auto space-x-4">
              <div className="flex-col items-center space-y-6">
                <h1 className="text-5xl text-gray-300 font-bold">
                  Communcation <br></br> infrastructure for <br></br>{" "}
                  individuals
                </h1>
                <p className="text-gray-400 font-medium">
                  With Harmony’s flexibility, you can connect, create, <br></br>
                  and stay in sync effortlessly—all in one place.
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => router.push("/sign-up")}
                    className="bg-indigo-600 px-4 py-2 rounded-md"
                  >
                    <p className="text-gray-300 font-medium text-sm">
                      Get started
                    </p>
                  </button>
                  <button
                    className="px-2 py-2 rounded-md"
                    onClick={() => router.push("/about")}
                  >
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
            <div className="h-3/4 w-1/2 flex flex-grow py-4 justify-center ml-auto mr-auto space-x-12">
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
      </main>
      <main className="flex items-center justify-center w-full min-h-screen bg-zinc-900 border-t border-zinc-800">
        <div className="w-3/5 h-full flex-col justify-center items-center space-y-16 my-16">
          <section className="w-full h-1/4 flex flex-col items-center justify-center space-y-8">
            <GoogleIcon className="w-12 h-12 text-center" />
            <h2 className="text-3xl text-gray-300 font-semibold text-center">
              A powerful Design API to sync and <br></br> transform your design
              tokens at scale.
            </h2>
          </section>
          <section className="grid grid-cols-3 w-full gap-8">
            {data.features.map((feature: any, index: number) => {
              return (
                <div
                  className="w-full flex items-center justify-center"
                  key={index}
                >
                  <div className="flex items-center h-full">
                    <div className="flex h-full items-center justify-center px-2 py-1">
                      <MicrophoneIcon className="w-6 h-6 text-gray-300" />
                    </div>
                    <div className="flex-col px-2 py-1">
                      <h3 className="text text-indigo-600 font-semibold">
                        {feature.title}
                      </h3>
                      <p className="font-medium text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          <section className="w-full flex items-center justify-center">
            <Image
              src="/images/mockup_highquality.jpeg"
              width={1000}
              height={750}
              quality={100}
              alt="Mockup"
              unoptimized={true}
            />
          </section>
        </div>
      </main>
    </>
  );
}
