import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTauntCycle } from "./useTauntCycle";

describe("useTauntCycle", () => {
  it("returns a taunt and tooltipText on mount", () => {
    const { result } = renderHook(() => useTauntCycle());
    expect(result.current.taunt).toBeDefined();
    expect(typeof result.current.taunt.touch).toBe("string");
    expect(typeof result.current.taunt.mouse).toBe("string");
    expect(typeof result.current.tooltipText).toBe("string");
  });

  it("tauntSeed starts at 0", () => {
    const { result } = renderHook(() => useTauntCycle());
    expect(result.current.tauntSeed).toBe(0);
  });

  it("nextTaunt changes to a different taunt", () => {
    const { result } = renderHook(() => useTauntCycle());
    const tauntBefore = result.current.taunt;
    act(() => {
      result.current.nextTaunt();
    });
    expect(result.current.taunt).not.toBe(tauntBefore);
  });

  it("nextTaunt increments tauntSeed", () => {
    const { result } = renderHook(() => useTauntCycle());
    act(() => {
      result.current.nextTaunt();
    });
    expect(result.current.tauntSeed).toBe(1);
  });
});
