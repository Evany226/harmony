import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  PhoneArrowUpRightIcon,
  VideoCameraIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

interface ConvPageHeaderProps {
  headerText: string;
  image1: string;
  image2?: string;
  hasMultipleUsers: boolean;
}

export default function ConvPageHeader({
  headerText,
  image1,
  image2,
  hasMultipleUsers,
}: ConvPageHeaderProps) {
  return (
    <header className="flex justify-between w-full h-12 bg-zinc-900 border-b border-zinc-800 px-3 py-3 items-center">
      <div className="flex space-x-3 items-center">
        {hasMultipleUsers ? (
          <div className="w-10 h-10 relative ml-2">
            <Avatar className="w-7 h-7 absolute top-0 left-0 border-2 border-neutral-900">
              <AvatarImage src={image1} />
              <AvatarFallback />
            </Avatar>
            <Avatar className="w-7 h-7 absolute right-0 bottom-0 border-2 border-neutral-900">
              <AvatarImage src={image2} />
              <AvatarFallback />
            </Avatar>
          </div>
        ) : (
          <Avatar className="w-7 h-7 ml-2">
            <AvatarImage src={image1} />
            <AvatarFallback />
          </Avatar>
        )}
        <h1 className="text-gray-300 font-semibold">{headerText}</h1>
      </div>

      <div className="flex space-x-4 items-center mr-2">
        <PhoneArrowUpRightIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 cursor-pointer" />
        <VideoCameraIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 cursor-pointer" />
        <UserCircleIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 cursor-pointer" />
        <div className="flex items-center bg-zinc-800 rounded-sm py-1 px-2">
          <input
            className="outline-0 w-full bg-zinc-800 font-semibold text-xs"
            placeholder="Search"
          ></input>
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-pointer" />
        </div>
        <QuestionMarkCircleIcon className="w-7 h-7 text-gray-400 hover:text-gray-300 cursor-pointer" />
      </div>
    </header>
  );
}
