"use client";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";

interface ChatInputProps {
  inputValue?: string;
  setInputValue?: (value: string) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  socketLoading?: boolean;
}

export default function ChatInput({
  inputValue,
  setInputValue,
  handleSubmit,
  socketLoading,
}: ChatInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (setInputValue) {
      setInputValue(e.target.value);
    }
  };

  return (
    <form
      className="w-full bg-neutral-800 py-1.5 px-4 rounded-lg mb-6"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center">
        <PlusCircleIcon className="w-7 text-gray-300" />
        <input
          className="outline-0 ml-3 w-full bg-neutral-800 text-gray-300 py-1 box-border"
          placeholder="Find or start a conversation"
          style={{ boxSizing: "border-box" }}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button variant="outline" type="submit" disabled={socketLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
}
