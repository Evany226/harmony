"use client";

import { createContext, useContext } from "react";
import useSound from "use-sound";

interface AudioContextProps {
  playJoinSound: () => void;
  playLeaveSound: () => void;
  playMuteSound: () => void;
  playUnmuteSound: () => void;
  playCallSound: () => void;
  stopCallSound: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playJoinSound] = useSound("/audio/join-call.mp3");
  const [playLeaveSound] = useSound("/audio/leave-call.mp3");
  const [playMuteSound] = useSound("/audio/mute-sound.mp3");
  const [playUnmuteSound] = useSound("/audio/unmute-sound.mp3");
  const [playCallSound, { stop: stopCallSound }] = useSound(
    "/audio/call-sound.mp3"
  );

  const value = {
    playJoinSound,
    playLeaveSound,
    playMuteSound,
    playUnmuteSound,
    playCallSound,
    stopCallSound,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
