import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about",
  "/pricing",
  "/customers",
  "/support",
]);

export default clerkMiddleware((auth, request) => {
  if (!auth().userId && !isPublicRoute(request)) {
    auth().redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/home/conversations",
    "/home/conversations/:id*",
    "/home/friends",
    "/home/friends/add-friends",
    "/home/friends/blocked",
    "/home/friends/online",
    "/home/friends/pending",
    "/home/guild-requests/pending",
    "/guilds/:id*/:channelId*",
  ],
};
