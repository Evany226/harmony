import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-zinc-900">
      <SignIn />
    </div>
  );
}
