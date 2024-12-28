"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import HomeNav from "@/components/home/HomeNav";
import {
  MicrophoneIcon,
  VideoCameraIcon,
  ChatBubbleLeftEllipsisIcon,
  RectangleGroupIcon,
  UserPlusIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const data = [
  {
    title: "Voice Chat",
    description:
      "Crystal-clear audio calls to connect with friends and groups effortlessly.",
    icon: <MicrophoneIcon className="w-6 h-6 text-gray-300" />,
  },
  {
    title: "Video Calls",
    description:
      "High-quality video calling for seamless face-to-face communication.",
    icon: <VideoCameraIcon className="w-6 h-6 text-gray-300" />,
  },
  {
    title: "Live Chat",
    description:
      "Real-time text messaging for instant communication with friends or groups.",
    icon: <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-gray-300" />,
  },
  {
    title: "Guilds",
    description:
      "Create and manage communities with customizable Discord-like servers.",
    icon: <RectangleGroupIcon className="w-6 h-6 text-gray-300" />,
  },
  {
    title: "Friend",
    description:
      "Easily manage your friends and keep track of important connections.",
    icon: <UserPlusIcon className="w-6 h-6 text-gray-300" />,
  },
  {
    title: "Notifications",
    description:
      "Stay updated with instant notifications for messages, calls, and activity.",
    icon: <BellAlertIcon className="w-6 h-6 text-gray-300" />,
  },
];

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
];

import {
  GoogleIcon,
  MetaIcon,
  NetflixIcon,
  AppleIcon,
  SamsungIcon,
  NvidiaIcon,
  SteamIcon,
  DiscordIcon,
  TwitterIcon,
  FacebookIcon,
  GithubIcon,
} from "@/assets/icons/BrandIcons";
import { Facebook, Icon } from "lucide-react";

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
            <main className="w-3/4 h-full flex items-center justify-center ml-auto mr-auto space-x-4 sm:flex-col sm:w-full sm:space-x-0 sm:my-8 md:w-5/6">
              <div className="flex-col items-center space-y-6">
                <h1 className="text-5xl text-gray-300 font-bold sm:text-4xl sm:text-center">
                  Communcation <br></br> infrastructure for <br></br>{" "}
                  individuals
                </h1>
                <p className="text-gray-400 font-medium sm:text-sm sm:text-center">
                  With Harmony’s flexibility, you can connect, create, <br></br>
                  and stay in sync effortlessly—all in one place.
                </p>
                <div className="flex items-center space-x-2 sm:justify-center">
                  <button
                    onClick={() => router.push("/sign-up")}
                    className="bg-indigo-600 px-4 py-2 rounded-md"
                  >
                    <p className="text-gray-300 font-medium text-sm sm:text-xs">
                      Get started
                    </p>
                  </button>
                  <button
                    className="px-2 py-2 rounded-md"
                    onClick={() => router.push("/about")}
                  >
                    <p className="text-gray-300 font-medium text-sm sm:text-xs">
                      Read our vision
                    </p>
                  </button>
                </div>
              </div>
              <div className="flex items-center sm:mt-8">
                <Image
                  src="/images/main.svg"
                  width={600}
                  height={600}
                  alt="Home Graphic"
                />
              </div>
            </main>
          </section>
          <section className="w-full h-1/4 flex-col mt-8">
            <div className="w-full h-1/4 flex items-center justify-center">
              <p className="text-gray-300 font-medium sm:text-sm">
                Already endorsed by these product teams
              </p>
            </div>
            <div className="h-3/4 w-1/2 flex flex-grow py-4 justify-center ml-auto mr-auto space-x-12 md:w-full sm:flex-wrap sm:space-x-8">
              <GoogleIcon className="w-12 sm:w-8" />
              <NetflixIcon className="w-12 sm:w-8" />
              <MetaIcon className="w-12 sm:w-8" />
              <AppleIcon className="w-12 sm:w-8" />
              <SamsungIcon className="w-12 sm:w-8" />
              <NvidiaIcon className="w-12 sm:w-8" />
              <SteamIcon className="w-12 sm:w-8" />
              <DiscordIcon className="w-12 sm:w-8" />
            </div>
          </section>
        </div>
      </main>

      <main className="flex items-center justify-center w-full min-h-screen bg-zinc-900 border-t border-zinc-800">
        <div className="w-2/3 h-full flex-col justify-center items-center space-y-16 my-20 sm:w-4/5 sm:my-12">
          <section className="w-full h-1/4 flex flex-col items-center justify-center space-y-8">
            <GoogleIcon className="w-12 h-12 text-center" />
            <h2 className="text-3xl text-gray-300 font-semibold text-center sm:text-2xl">
              A powerful Design API to sync and <br></br> transform your design
              tokens at scale.
            </h2>
          </section>
          <section className="grid grid-cols-3 w-full gap-8 sm:grid-cols-1">
            {data.map((feature: any, index: number) => {
              return (
                <div
                  className="w-full flex items-center justify-center"
                  key={index}
                >
                  <div className="flex items-center h-full">
                    <div className="flex h-full items-center justify-center px-2 py-1">
                      {feature.icon}
                    </div>
                    <div className="flex-col px-2 py-1">
                      <h3 className="text-indigo-600 font-semibold sm:text-sm">
                        {feature.title}
                      </h3>
                      <p className="font-medium text-gray-300 sm:text-sm">
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

      <main className="w-full bg-neutral-900 border-t border-zinc-800 pt-16 pb-8">
        <div className="flex flex-col w-4/5 ml-auto mr-auto items-center justify-center">
          <section className="flex flex-col items-center justify-center">
            <h3 className="text-lg text-gray-400 font-medium sm:text-center sm:text-normal">
              Experience Seamless Communication
            </h3>
            <h2 className="text-3xl text-gray-300 font-semibold mt-4 sm:text-center sm:text-2xl">
              Request More Information
            </h2>
            <p className="text-gray-300 text-center mt-6 sm:text-sm">
              Harmony is designed to bring people closer, enabling effortless
              voice and video <br /> communication for teams, friends, and
              communities.
            </p>
            <button className="bg-indigo-600 px-6 py-2 text-white rounded-md mt-10 sm:text-sm">
              Contact Us
            </button>
            <p className="text-gray-300 font-medium mt-10 sm:text-sm">
              2019 Lift Media. LLC
            </p>
          </section>
          <section className="border-t border-zinc-800 w-full mt-8 py-6 flex items-center justify-between relative sm:flex-col sm:space-y-4">
            <div className="flex items-center">
              <Image
                src="/images/logo-past.png"
                width={45}
                height={45}
                alt="Logo"
              />
              <h1 className="text-xl text-gray-300 font-semibold ml-2">
                Harmony
              </h1>
            </div>

            <ul className="flex space-x-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:top-0 sm:left-0 sm:-translate-x-0 sm:-translate-y-0 sm:transform-none sm:relative sm:space-x-2 sm:pt-0">
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

            <div className="flex items-center space-x-4">
              <FacebookIcon className="w-6 h-6 text-gray-300" />
              <TwitterIcon className="w-6 h-6 text-gray-300" />
              <GithubIcon className="w-6 h-6 text-gray-300" />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
