import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { signOut, auth } from "../../../auth";

export default async function ProfileCard() {
  const session = await auth();

  return (
    <div className="flex items-center w-full h-14 px-3 bg-stone-900 border-t border-zinc-800 bottom-0 absolute">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>EY</AvatarFallback>
      </Avatar>
      <div className="flex-col ml-2">
        <h2 className="text-gray-300 font-medium text-sm">
          {session?.user?.name}
        </h2>
        <p className="text-xs font-normal text-gray-400">Online</p>
      </div>

      <div className="ml-auto bg-zinc-800 p-1 rounded-md">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button type="submit" className="text-gray-300 text-sm">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
