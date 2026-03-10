import { useState, useCallback } from "react";
import { DRAG_TAUNTS } from "../../constants";

export const DEFAULT_TAUNT = {
  touch: "Hold and drag the card",
  mouse: "Click and drag the card",
};

// Evaluated once at module load — safe, pointer type doesn't change at runtime
export const isTouch = window.matchMedia("(pointer: coarse)").matches;

export const useTauntCycle = () => {
  const [tauntIndex, setTauntIndex] = useState(
    () => Math.floor(Math.random() * DRAG_TAUNTS.length),
  );
  const [tauntSeed, setTauntSeed] = useState(0);

  const taunt = DRAG_TAUNTS[tauntIndex] ?? DEFAULT_TAUNT;
  const tooltipText = isTouch ? taunt.touch : taunt.mouse;

  const nextTaunt = useCallback(() => {
    setTauntIndex((prev) => {
      let next = prev;
      while (next === prev) next = Math.floor(Math.random() * DRAG_TAUNTS.length);
      return next;
    });
    setTauntSeed((s) => s + 1);
  }, []);

  return { taunt, tauntSeed, tooltipText, nextTaunt };
};
