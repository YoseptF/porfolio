import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { buildTypewriterFrames, useTypewriter } from "./useTypewriter";

describe("buildTypewriterFrames", () => {
  it("produces one frame per character", () => {
    // "Hi" = 2 chars → 2 frames
    expect(buildTypewriterFrames("Hi")).toHaveLength(2);
  });

  it("produces correct frame count for a multi-word string", () => {
    // "Hi there" = 8 chars (including space) → 8 frames
    expect(buildTypewriterFrames("Hi there")).toHaveLength(8);
  });

  it("final frame has all words in completedWords, inProgress empty", () => {
    const frames = buildTypewriterFrames("Hello world");
    const last = frames[frames.length - 1];
    expect(last?.state.completedWords).toEqual(["Hello", "world"]);
    expect(last?.state.inProgress).toBe("");
  });

  it("single word - final frame has correct state", () => {
    const frames = buildTypewriterFrames("Hello");
    const last = frames[frames.length - 1];
    expect(last?.state.completedWords).toEqual(["Hello"]);
    expect(last?.state.inProgress).toBe("");
  });

  it("mid-word frames have inProgress populated and completedWords only prior words", () => {
    const frames = buildTypewriterFrames("Hi there");
    // Frame at index 0 = typing 'H' (inProgress='H', completedWords=[])
    expect(frames[0]?.state.inProgress).toBe("H");
    expect(frames[0]?.state.completedWords).toEqual([]);
    // Frame at index 2 = the space after 'Hi' → completedWords=['Hi'], inProgress=''
    expect(frames[2]?.state.completedWords).toEqual(["Hi"]);
    expect(frames[2]?.state.inProgress).toBe("");
  });

  it("delays are cumulative at 65ms per character", () => {
    const frames = buildTypewriterFrames("Hi");
    expect(frames[0]?.delay).toBe(65);
    expect(frames[1]?.delay).toBe(130);
  });
});

describe("useTypewriter", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns empty state when active=false", () => {
    const { result } = renderHook(() =>
      useTypewriter("Hello world", false, 0),
    );
    expect(result.current.completedWords).toEqual([]);
    expect(result.current.inProgress).toBe("");
  });

  it("completes all words after all timeouts fire", () => {
    const { result } = renderHook(() => useTypewriter("Hello world", true, 0));
    act(() => {
      vi.runAllTimers();
    });
    expect(result.current.completedWords).toEqual(["Hello", "world"]);
    expect(result.current.inProgress).toBe("");
  });

  it("resetting active to false clears state immediately", () => {
    const { result, rerender } = renderHook(
      ({ active }: { active: boolean }) => useTypewriter("Hello world", active, 0),
      { initialProps: { active: true } },
    );
    act(() => {
      vi.runAllTimers();
    });
    expect(result.current.completedWords).toHaveLength(2);

    rerender({ active: false });
    expect(result.current.completedWords).toEqual([]);
    expect(result.current.inProgress).toBe("");
  });

  it("changing seed restarts animation from empty", () => {
    const { result, rerender } = renderHook(
      ({ seed }: { seed: number }) => useTypewriter("Hi", true, seed),
      { initialProps: { seed: 0 } },
    );
    act(() => {
      vi.runAllTimers();
    });
    expect(result.current.completedWords).toEqual(["Hi"]);

    rerender({ seed: 1 });
    // Should have reset to empty immediately
    expect(result.current.completedWords).toEqual([]);
    expect(result.current.inProgress).toBe("");
  });
});
