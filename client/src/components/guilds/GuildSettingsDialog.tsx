"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const tabs = [{ name: "Overview" }, { name: "Roles" }, { name: "Emojis" }];

export default function GuildSettingsDialog() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <DialogContent className="bg-neutral-800 max-w-screen h-screen p-0">
      <div className="w-full h-full flex">
        <main className="h-full w-4/12 bg-neutral-900 flex items-center justify-end px-4">
          <section className="h-full py-2 flex flex-col mt-24 min-w-40">
            <h1 className="text-gray-400 font-semibold text-sm ml-1.5">
              Spicy Chiess Klaub
            </h1>

            <ul className="mt-1 w-full flex flex-col space-y-1">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className={`text-gray-300 font-medium text-base px-1.5 py-0.5 rounded-sm hover:bg-zinc-800 cursor-pointer ${
                    selectedTab === index ? "bg-zinc-700" : ""
                  }`}
                  onClick={() => setSelectedTab(index)}
                >
                  {tab.name}
                </li>
              ))}
              <Separator className="bg-zinc-600" />
              <li className="flex items-center justify-between px-1.5 py-0.5 rounded-sm hover:bg-zinc-800 cursor-pointer">
                <p className="text-red-500 font-medium text-base ">
                  Delete Server
                </p>
                <TrashIcon className="w-4 h-4 text-red-500 inline" />
              </li>
            </ul>
          </section>
        </main>

        <aside className="h-full w-8/12 bg-neutral-800 p-2">
          {selectedTab === 0 && (
            <div>
              <h2 className="text-gray-300">Overview</h2>
              {/* Add overview content here */}
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              <h2 className="text-gray-300">Roles</h2>
              {/* Add roles content here */}
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <h2 className="text-gray-300">Emojis</h2>
              {/* Add emojis content here */}
            </div>
          )}
        </aside>
      </div>
    </DialogContent>
  );
}
