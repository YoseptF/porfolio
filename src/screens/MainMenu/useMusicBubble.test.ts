import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../../services/audioPlayer", () => ({
  isMusicEnabled: vi.fn(() => false),
  audioPlayer: { isPlaying: vi.fn(() => false) },
}));

import { isMusicEnabled, audioPlayer } from "../../services/audioPlayer";
import { useMusicBubble } from "./useMusicBubble";

const mockIsMusicEnabled = vi.mocked(isMusicEnabled);
const mockIsPlaying = vi.mocked(audioPlayer.isPlaying);

beforeEach(() => {
  localStorage.clear();
  mockIsMusicEnabled.mockReturnValue(false);
  mockIsPlaying.mockReturnValue(false);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("useMusicBubble", () => {
  it("showMusicBubble is true when music is off and bubble not dismissed", () => {
    mockIsMusicEnabled.mockReturnValue(false);
    const { result } = renderHook(() => useMusicBubble(false));
    expect(result.current.showMusicBubble).toBe(true);
  });

  it("showMusicBubble is false when bubble is dismissed", () => {
    localStorage.setItem("musicBubbleDismissed", "true");
    const { result } = renderHook(() => useMusicBubble(false));
    expect(result.current.showMusicBubble).toBe(false);
  });

  it("showMusicBubble is true when music is on and audio is blocked", () => {
    mockIsMusicEnabled.mockReturnValue(true);
    mockIsPlaying.mockReturnValue(false);
    const { result } = renderHook(() => useMusicBubble(false));

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(result.current.showMusicBubble).toBe(true);
  });

  it("handleDismissBubble sets localStorage and hides bubble", () => {
    const { result } = renderHook(() => useMusicBubble(false));
    expect(result.current.showMusicBubble).toBe(true);

    act(() => {
      result.current.handleDismissBubble({
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent);
    });

    expect(localStorage.getItem("musicBubbleDismissed")).toBe("true");
    expect(result.current.showMusicBubble).toBe(false);
  });

  it("audio-blocked check does NOT fire when introActive=true", () => {
    mockIsMusicEnabled.mockReturnValue(true);
    mockIsPlaying.mockReturnValue(false);
    const { result } = renderHook(() => useMusicBubble(true));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Should NOT show audio-blocked bubble while intro is active
    expect(result.current.showMusicBubble).toBe(false);
  });

  it("isMusicActive reflects isMusicEnabled initial value", () => {
    mockIsMusicEnabled.mockReturnValue(true);
    const { result } = renderHook(() => useMusicBubble(false));
    expect(result.current.isMusicActive).toBe(true);
  });

  it("setIsMusicActive updates isMusicActive", () => {
    const { result } = renderHook(() => useMusicBubble(false));
    expect(result.current.isMusicActive).toBe(false);

    act(() => {
      result.current.setIsMusicActive(true);
    });

    expect(result.current.isMusicActive).toBe(true);
  });
});
