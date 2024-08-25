export default function Conversation({ params }: { params: { id: string } }) {
  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center">
        Test header
      </header>
      <p>This is a conversation page{params.id}</p>;
    </>
  );
}
