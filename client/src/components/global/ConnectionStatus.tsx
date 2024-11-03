export default function ConnectionStatus({
  isConnected,
}: {
  isConnected: boolean;
}) {
  return (
    <>
      {isConnected ? (
        <div className="absolute rounded-full w-2.5 h-2.5 bg-green-600 z-10 bottom-0.5 right-0 outline outline-2 outline-gray-700 items flex items-center justify-center"></div>
      ) : (
        <div className="absolute rounded-full w-2.5 h-2.5 bg-gray-400 z-10 bottom-0.5 right-0 outline outline-2 outline-gray-700 items flex items-center justify-center">
          <div className="rounded-full w-0.5 h-0.5 bg-gray-700 outline outline-2 outline-gray-700"></div>
        </div>
      )}
    </>
  );
}
