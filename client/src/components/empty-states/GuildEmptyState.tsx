import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface GuildEmptyStateProps {
  name: string;
  imageUrl: string;
}

export default function GuildEmptyState({
  name,
  imageUrl,
}: GuildEmptyStateProps) {
  return (
    <>
      {imageUrl ? (
        <div className="w-full h-full flex items-center justify-center">
          <section className="w-2/5 flex flex-col items-center">
            <Avatar className="w-24 h-24 mt-4">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>
                {" "}
                <Skeleton className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
            <h1 className="text-gray-300 text-3xl font-semibold mt-4 md:text-2xl md:text-center">
              Welcome to #{name}
            </h1>
            <p className="text-gray-300 text-base font-normal mt-4 text-center md:text-sm">
              This is your brand new text channel. You can start by sending a
              message to your fellow guild members!
            </p>
          </section>
        </div>
      ) : null}
    </>
  );
}
