import AddFriendsForm from "@/components/friends/AddFriends";

export default function AddFriends() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center w-3/4 h-full px-4 py-3">
        <div className="w-full flex flex-col space-y-3 px-3">
          <h1 className="text-base text-gray-300 font-semibold">Add Friends</h1>
          <p className="text-sm text-gray-300">
            You can add friends using their Harmony username.
          </p>
          <AddFriendsForm />
        </div>
      </div>
    </div>
  );
}
