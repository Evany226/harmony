import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

interface ConvEmptyStateProps {
  name: string;
  imageUrl: string;
}

export default function ConvEmptyState({
  name,
  imageUrl,
}: ConvEmptyStateProps) {
  return (
    <>
      {imageUrl ? (
        <div>
          <Avatar className="w-24 h-24 mt-4">
            <AvatarImage src={imageUrl} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <h1 className="text-gray-200 text-3xl font-semibold mt-4">{name}</h1>
          <p className="text-gray-300 text-base font-normal mt-4">
            This is the beginning of your conversation with{" "}
            <span className="font-semibold">{name}</span>.
          </p>
          <Separator className="my-4" orientation="horizontal" />
        </div>
      ) : null}
    </>
  );
}
