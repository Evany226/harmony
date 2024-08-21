import ProfileCard from "@/components/profile/ProfileCard";

export default function Guild({ params }: { params: { id: string } }) {
  return (
    <section className="flex w-full h-full bg-zinc-900">
      <div className="flex flex-col w-64 h-full bg-neutral-900 border-x border-zinc-800 relative">
        <header className="flex items-center justify-center w-full h-12 bg-neutral-900 border-b border-zinc-800 px-3">
          <p className="text-gray-300">Hello</p>
        </header>
        <ProfileCard />
      </div>
      <p className="text-gray-300">This is a guild page: {params.id}</p>
    </section>
  );
}
