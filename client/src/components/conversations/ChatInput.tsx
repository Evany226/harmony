import { PlusCircleIcon } from "@heroicons/react/24/solid";
export default function ChatInput() {
  return (
    <section className="w-full bg-zinc-800 py-2 px-4 rounded-lg mb-6">
      <div className="flex items-center">
        <PlusCircleIcon className="w-7 text-gray-300" />
        <input
          className="outline-0 ml-3 w-full bg-zinc-800 text-gray-300 py-1 box-border"
          placeholder="Find or start a conversation"
          style={{ boxSizing: "border-box" }}
        />
      </div>
    </section>
  );
}
