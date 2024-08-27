import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface MessageCardProps {
  name: string;
  message: string;
  imageUrl: string;
}

export default function MessageCard({
  name,
  message,
  imageUrl,
}: MessageCardProps) {
  return (
    <div className="flex w-full items-center mb-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src={imageUrl} />
      </Avatar>
      <div className="flex flex-col ml-4">
        <p className="font-semibold text-gray-300">{name}</p>
        <p className="font-normal text-gray-300">{message}</p>
      </div>
    </div>
  );
}
