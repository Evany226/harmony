import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { formatTimestamp } from "@/lib/utils";

interface MessageCardProps {
  name: string;
  message: string;
  imageUrl: string;
  createdAt: string;
}

export default function MessageCard({
  name,
  message,
  imageUrl,
  createdAt,
}: MessageCardProps) {
  return (
    <div className="flex w-full items-center mb-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>
          <Skeleton className="w-full h-full" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-4">
        <div className="flex items-center">
          <p className="font-semibold text-gray-300">{name}</p>
          <p className="text-gray-400 text-sm ml-3">
            {formatTimestamp(createdAt)}
          </p>
        </div>
        <p className="font-normal text-gray-300">{message}</p>
      </div>
    </div>
  );
}
