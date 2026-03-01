export const isMusicEnabled = () => localStorage.getItem("musicEnabled") === "true";

let _audio: HTMLAudioElement | null = null;

export const audioPlayer = {
  start() {
    if (_audio) return;
    _audio = new Audio("/music/theme.mp3");
    _audio.loop = true;
    _audio.volume = 0.5;
    _audio.play().catch(() => {});
  },
  tryPlay() {
    _audio?.play().catch(() => {});
  },
  stop() {
    if (!_audio) return;
    _audio.pause();
    _audio = null;
  },
  isPlaying() {
    return _audio !== null && !_audio.paused;
  },
};
