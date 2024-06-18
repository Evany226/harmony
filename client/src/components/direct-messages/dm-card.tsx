import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DirectMessage() {
    return (
        <div className="flex items-center w-full h-10">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-gray-400 ml-3">Evan Yang</h2>
            </div>

        </div>
    )
}