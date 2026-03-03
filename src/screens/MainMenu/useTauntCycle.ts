import { useState, useEffect } from "react";
import { DRAG_TAUNTS, TAUNT_CYCLE_MS } from "../../constants";

export const DEFAULT_TAUNT = {
  touch: "Hold and drag the card",
  mouse: "Click and drag the card",
};

// Evaluated once at module load — safe, pointer type doesn't change at runtime
export const isTouch = window.matchMedia("(pointer: coarse)").matches;

type TauntCycleInput = {
  completedWords: string[];
  inProgress: string;
  cardBurnDone: boolean;
  hasDragged: boolean;
};

export const useTauntCycle = ({
  completedWords,
  inProgress,
  cardBurnDone,
  hasDragged,
}: TauntCycleInput) => {
  const [tauntIndex, setTauntIndex] = useState(
    () => Math.floor(Math.random() * DRAG_TAUNTS.length),
  );
  const [tauntSeed, setTauntSeed] = useState(0);

  const taunt = DRAG_TAUNTS[tauntIndex] ?? DEFAULT_TAUNT;
  const tooltipText = isTouch ? taunt.touch : taunt.mouse;

  const isTypingDone =
    completedWords.length > 0 &&
    inProgress === "" &&
    completedWords.join(" ") === tooltipText;

  useEffect(() => {
    if (!isTypingDone || hasDragged || !cardBurnDone) return;
    const id = setTimeout(() => {
      setTauntIndex((prev) => {
        let next = prev;
        while (next === prev) next = Math.floor(Math.random() * DRAG_TAUNTS.length);
        return next;
      });
      setTauntSeed((s) => s + 1);
    }, TAUNT_CYCLE_MS);
    return () => clearTimeout(id);
  }, [isTypingDone, hasDragged, cardBurnDone]);

  return { taunt, tauntSeed, tooltipText };
};
