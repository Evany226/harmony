import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

interface ChatHeaderProps {
  name: string;
  imageUrl: string;
}

export default function ChatHeader({ name, imageUrl }: ChatHeaderProps) {
  return (
    <>
      {imageUrl ? (
        <div className="px-5">
          <Avatar className="w-24 h-24 mt-4">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              {" "}
              <Skeleton className="w-full h-full" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-gray-200 text-3xl font-semibold mt-4">{name}</h1>
          <p className="text-gray-300 text-base font-normal mt-2">
            This is the beginning of your conversation with{" "}
            <span className="font-semibold">{name}</span>.
          </p>
          <Separator className="my-4" orientation="horizontal" />
        </div>
      ) : null}
    </>
  );
}
