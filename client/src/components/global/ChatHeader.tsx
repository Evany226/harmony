import { Separator } from "../ui/separator";
import Image from "next/image";

interface ChatHeaderProps {
  name: string;
  imageUrl: string;
}

export default function ChatHeader({ name, imageUrl }: ChatHeaderProps) {
  return (
    <>
      {imageUrl ? (
        <div className="px-5">
          <div className="w-24 h-24 mt-4 relative">
            <Image
              src={imageUrl}
              alt="Chat header mascot image"
              fill
              className="rounded-full"
            />
          </div>
          <h1 className="text-gray-200 text-3xl font-semibold mt-4 sm:text-2xl">
            {name}
          </h1>
          <p className="text-gray-300 text-base font-normal mt-2 sm:text-sm">
            This is the beginning of your conversation with{" "}
            <span className="font-semibold">{name}</span>.
          </p>
          <Separator className="my-4" orientation="horizontal" />
        </div>
      ) : null}
    </>
  );
}
