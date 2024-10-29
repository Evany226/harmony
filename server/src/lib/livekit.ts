import { RoomServiceClient } from "livekit-server-sdk";

const livekitHost = "wss://harmony-zknfyk4k.livekit.cloud";
const roomService = new RoomServiceClient(
  livekitHost,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

export { roomService }; // Export the roomService instance for use in other modules
