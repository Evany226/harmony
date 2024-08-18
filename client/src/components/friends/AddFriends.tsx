import { Button } from "../ui/button";

export default function AddFriendsInput() {
  return (
    <div className="w-full flex flex-col space-y-3 px-3">
      <h1 className="text-base text-gray-300 font-semibold">Add Friends</h1>
      <p className="text-sm text-gray-300">
        You can add friends using their Harmony username.
      </p>
      <input
        className="outline-0 rounded-md w-full text-sm bg-zinc-800 py-3 px-3 text-gray-300"
        placeholder="Add friends by entering their username."
      ></input>
      <div className="w-full flex justify-end">
        <Button variant="outline" size="sm">
          Send friend request
        </Button>
      </div>
    </div>
  );
}
