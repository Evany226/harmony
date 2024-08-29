"use client";
import { useState } from "react";

interface ConvDropdownItemProps {
  username: string;
  imageUrl: string;
}

export default function ConvDropdownItem() {
  const [selected, setSelected] = useState<boolean>(true);

  return (
    <div className="w-full flex items-center flex-between hover:bg-zinc-700 px-2 py-1 rounded-md">
      <label className="w-full text-base text-gray-300 outline-0">
        xxFOLDINGCHAIRxx
      </label>
      <input
        type="checkbox"
        className="w-4 h-4  accent-blue-500 border-gray-300 rounded-md"
        checked={selected}
        onChange={() => setSelected(!selected)}
      />
    </div>
  );
}
