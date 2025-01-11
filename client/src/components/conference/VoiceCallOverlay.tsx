"use client";

import { getLiveKitToken } from "@/lib/conversations";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useVoiceCall } from "@/context/VoiceCallContext";
import { socket } from "@/app/socket";
import { useAudio } from "@/context/AudioContext";
import { useAuth } from "@clerk/nextjs";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";

import "@livekit/components-styles";

import { Track } from "livekit-client";

const serverUrl = "wss://harmony-zknfyk4k.livekit.cloud";

interface VoiceCallOverlayProps {
  convId: string;
}

export default function VoiceCallOverlay({ convId }: VoiceCallOverlayProps) {
  const [token, setToken] = useState("");
  const { user } = useUser();
  const { isVoiceCallOpen, setIsVoiceCallOpen } = useVoiceCall();
  const { playLeaveSound } = useAudio();
  const { getToken } = useAuth();

  const userName = user?.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = await getToken();
        const roomName = convId;
        const token = await getLiveKitToken(
          authToken as string,
          roomName,
          userName as string
        );
        console.log(token);
        setToken(token);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [convId, userName, getToken]);

  if (token === "") {
    return <div>Getting token...</div>;
  }

  const handleLeaveRoom = () => {
    if (isVoiceCallOpen) {
      playLeaveSound();
      setIsVoiceCallOpen(false);
      socket.emit("checkRoomEmpty", convId);
      socket.emit("leaveVoiceCall", convId);
    }
  };

  return (
    <div className="w-full h-1/2 bg-neutral-950">
      <LiveKitRoom
        video={false}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        onDisconnected={handleLeaveRoom}
        // Use the default LiveKit theme for nice styles.
        data-lk-theme="default"
        style={{ height: "100%" }}
      >
        {/* Your custom component with basic video conferencing functionality. */}
        <MyVideoConference />
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />
        {/* Controls for the user to start/stop audio, video, and screen
        share tracks and to leave the room. */}
        <ControlBar />
      </LiveKitRoom>
    </div>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100% - var(--lk-control-bar-height))" }}
    >
      {/* The GridLayout accepts zero or one child. The child is used
          as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}
