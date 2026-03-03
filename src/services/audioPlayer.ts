export const isMusicEnabled = () => localStorage.getItem("musicEnabled") === "true";

let _audio: HTMLAudioElement | null = null;

export const audioPlayer = {
  start() {
    if (_audio && !_audio.paused) return;
    if (!_audio) {
      _audio = new Audio("/music/theme.mp3");
      _audio.loop = true;
      _audio.volume = 0.5;
    }
    _audio.play().catch(() => {});
  },
  // Must be called from a user-gesture handler.
  // Plays silently then immediately pauses, which "activates" the element on iOS/Firefox
  // Android so that subsequent start() calls from setTimeout contexts work too.
  unlock() {
    if (!_audio) {
      _audio = new Audio("/music/theme.mp3");
      _audio.loop = true;
      _audio.volume = 0.5;
    }
    const prev = _audio.volume;
    _audio.volume = 0;
    _audio.play().then(() => {
      if (_audio) {
        _audio.pause();
        _audio.currentTime = 0;
        _audio.volume = prev;
      }
    }).catch(() => {});
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
