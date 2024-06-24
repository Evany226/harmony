import { signIn, auth } from "../../../auth";

export default async function Login() {
  const session = await auth();

  return (
    <div>
      <h1>This is the login page</h1>
      <p>Signed in as {session?.user?.email}</p>;
      <form
        action={async () => {
          "use server";
          await signIn("google", { callbackUrl: "/dashboard" });
        }}
      >
        <button type="submit" className="bg-red-100">
          Signin with Google
        </button>
      </form>
    </div>
  );
}
