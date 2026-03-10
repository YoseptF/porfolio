export const isMusicEnabled = () => localStorage.getItem("musicEnabled") === "true";

const BALATRO_TRACK = "/music/theme.mp3";
const TERRARIA_TRACK = "/music/terraria-theme.mp3";

export const musicTracks = { BALATRO_TRACK, TERRARIA_TRACK };

let _trackPath = BALATRO_TRACK;
let _audio: HTMLAudioElement | null = null;

export const audioPlayer = {
  start() {
    if (_audio && !_audio.paused) return;
    if (!_audio) {
      _audio = new Audio(_trackPath);
      _audio.loop = true;
      _audio.volume = 0.5;
    }
    _audio.play()?.catch(() => {});
  },
  // Must be called from a user-gesture handler.
  // Plays silently then immediately pauses, which "activates" the element on iOS/Firefox
  // Android so that subsequent start() calls from setTimeout contexts work too.
  unlock() {
    if (!_audio) {
      _audio = new Audio(_trackPath);
      _audio.loop = true;
      _audio.volume = 0.5;
    }
    const prev = _audio.volume;
    _audio.volume = 0;
    _audio.play()?.then(() => {
      if (_audio) {
        _audio.pause();
        _audio.currentTime = 0;
        _audio.volume = prev;
      }
    }).catch(() => {});
  },
  switchTrack(path: string) {
    _trackPath = path;
    if (_audio) {
      _audio.pause();
      _audio = null;
    }
    if (isMusicEnabled()) {
      _audio = new Audio(_trackPath);
      _audio.loop = true;
      _audio.volume = 0.5;
      _audio.play()?.catch(() => {});
    }
  },
  tryPlay() {
    _audio?.play()?.catch(() => {});
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
