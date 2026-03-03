import { useState, useEffect } from "react";
import { isMusicEnabled, audioPlayer } from "../../services/audioPlayer";

export const useMusicBubble = (introActive: boolean) => {
  const [isMusicActive, setIsMusicActive] = useState(() => isMusicEnabled());
  const [bubbleDismissed, setBubbleDismissed] = useState(
    () => localStorage.getItem("musicBubbleDismissed") === "true",
  );
  const [showAudioBlockedBubble, setShowAudioBlockedBubble] = useState(false);

  // After 1s post-intro, if music is enabled but audio hasn't started
  // (browser blocked autoplay), show the "browsers block music" speech bubble.
  useEffect(() => {
    if (!isMusicActive) return;
    if (introActive) return;
    const timer = setTimeout(() => {
      if (!audioPlayer.isPlaying()) setShowAudioBlockedBubble(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [introActive, isMusicActive]);

  const handleDismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem("musicBubbleDismissed", "true");
    setBubbleDismissed(true);
  };

  const showMusicBubble =
    (isMusicActive && showAudioBlockedBubble) ||
    (!isMusicActive && !bubbleDismissed);

  return {
    isMusicActive,
    setIsMusicActive,
    setShowAudioBlockedBubble,
    showMusicBubble,
    handleDismissBubble,
  };
};
