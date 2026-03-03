import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTauntCycle } from "./useTauntCycle";
import { TAUNT_CYCLE_MS } from "../../constants";

const makeBase = (overrides: Record<string, unknown> = {}) => ({
  completedWords: [],
  inProgress: "",
  cardBurnDone: true,
  hasDragged: false,
  ...overrides,
});

describe("useTauntCycle", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns a taunt and tooltipText on mount", () => {
    const { result } = renderHook(() => useTauntCycle(makeBase()));
    expect(result.current.taunt).toBeDefined();
    expect(typeof result.current.taunt.touch).toBe("string");
    expect(typeof result.current.taunt.mouse).toBe("string");
    expect(typeof result.current.tooltipText).toBe("string");
  });

  it("tauntSeed starts at 0", () => {
    const { result } = renderHook(() => useTauntCycle(makeBase()));
    expect(result.current.tauntSeed).toBe(0);
  });

  it("does NOT cycle when hasDragged=true even after TAUNT_CYCLE_MS", () => {
    const { result } = renderHook(() => {
      const { tooltipText } = useTauntCycle(makeBase({ hasDragged: false }));
      return tooltipText;
    });
    const initialText = result.current;

    // Now render with typing done and hasDragged=true
    const { result: r2 } = renderHook(() => {
      const text = initialText;
      const words = text.split(" ");
      return useTauntCycle(
        makeBase({
          completedWords: words,
          inProgress: "",
          hasDragged: true,
        }),
      );
    });

    const seedBefore = r2.current.tauntSeed;
    act(() => {
      vi.advanceTimersByTime(TAUNT_CYCLE_MS + 100);
    });
    expect(r2.current.tauntSeed).toBe(seedBefore);
  });

  it("does NOT cycle when typing is not done (inProgress non-empty)", () => {
    const { result } = renderHook(() =>
      useTauntCycle(
        makeBase({ completedWords: ["Hello"], inProgress: "wor", hasDragged: false }),
      ),
    );
    const seedBefore = result.current.tauntSeed;
    act(() => {
      vi.advanceTimersByTime(TAUNT_CYCLE_MS + 100);
    });
    expect(result.current.tauntSeed).toBe(seedBefore);
  });

  it("cycles to a different taunt after TAUNT_CYCLE_MS when typing done", () => {
    const emptyWords: string[] = [];
    const { result, rerender } = renderHook(
      ({ completedWords, inProgress }: { completedWords: string[]; inProgress: string }) =>
        useTauntCycle(makeBase({ completedWords, inProgress })),
      { initialProps: { completedWords: emptyWords, inProgress: "" } },
    );
    const matchingWords = result.current.tooltipText.split(" ");

    rerender({ completedWords: matchingWords, inProgress: "" });

    const tauntBefore = result.current.taunt;
    act(() => {
      vi.advanceTimersByTime(TAUNT_CYCLE_MS + 100);
    });
    expect(result.current.taunt).not.toBe(tauntBefore);
  });

  it("tauntSeed increments on each cycle", () => {
    const emptyWords: string[] = [];
    const { result, rerender } = renderHook(
      ({ completedWords, inProgress }: { completedWords: string[]; inProgress: string }) =>
        useTauntCycle(makeBase({ completedWords, inProgress })),
      { initialProps: { completedWords: emptyWords, inProgress: "" } },
    );
    const matchingWords = result.current.tooltipText.split(" ");

    rerender({ completedWords: matchingWords, inProgress: "" });
    expect(result.current.tauntSeed).toBe(0);

    act(() => {
      vi.advanceTimersByTime(TAUNT_CYCLE_MS + 100);
    });
    expect(result.current.tauntSeed).toBe(1);
  });

  it("does NOT cycle when cardBurnDone=false", () => {
    const { result } = renderHook(() => {
      const { tooltipText } = useTauntCycle(makeBase({ cardBurnDone: false }));
      const words = tooltipText.split(" ");
      return useTauntCycle(
        makeBase({ completedWords: words, inProgress: "", cardBurnDone: false }),
      );
    });
    const seedBefore = result.current.tauntSeed;
    act(() => {
      vi.advanceTimersByTime(TAUNT_CYCLE_MS + 100);
    });
    expect(result.current.tauntSeed).toBe(seedBefore);
  });
});
