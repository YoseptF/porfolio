let _audio: HTMLAudioElement | null = null;

export const audioPlayer = {
  start() {
    if (_audio) return;
    _audio = new Audio("/music/theme.mp3");
    _audio.loop = true;
    _audio.volume = 0.5;
    // play() might be blocked on hard reload (no prior user interaction).
    // The fallback attaches a one-time listener so audio starts on the
    // very next click or keypress — which will happen naturally.
    _audio.play().catch(() => {
      const resume = () => _audio?.play().catch(() => {});
      document.addEventListener("click", resume, { once: true });
      document.addEventListener("keydown", resume, { once: true });
    });
  },
  stop() {
    if (!_audio) return;
    _audio.pause();
    _audio = null;
  },
};
