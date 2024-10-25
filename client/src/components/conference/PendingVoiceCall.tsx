import { PhoneArrowUpRightIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface PendingVoiceCallProps {
  allImages: string[];
  lateJoin: () => void;
}

export default function PendingVoiceCall({
  allImages,
  lateJoin,
}: PendingVoiceCallProps) {
  return (
    <div className="w-full h-full bg-neutral-950 px-2 pt-2">
      <section className="w-full h-3/4 bg-neutral-900 rounded-md flex items-center justify-center">
        <div className="flex items-center">
          {allImages.map((image, index) => (
            <Avatar
              className="w-24 h-24 ml-2 border-4 border-neutral-900"
              key={index}
            >
              <AvatarImage src={image} />
              <AvatarFallback>
                <Skeleton className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </section>
      <section className="w-full h-1/4 flex items-center justify-center">
        <div
          className="bg-green-600 rounded-full p-3 cursor-pointer"
          onClick={lateJoin}
        >
          <PhoneArrowUpRightIcon className="w-6 h-6 text-gray-300" />
        </div>
      </section>
    </div>
  );
}
