import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-neutral-900 flex flex-col items-center justify-center space-y-4">
      <h2 className="text-3xl text-gray-300 font-bold">Error 404</h2>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-gray-300 font-medium text-center">
          The page you are trying to access does not <br></br> exist or has been
          moved. Try going back to the homepage.
        </p>
        <Link
          href="/home/friends"
          className="text-gray-300 bg-indigo-600 px-2 py-1 rounded-md hover:bg-indigo-700"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
