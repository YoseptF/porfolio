import { useState, useEffect } from "react";

export type TypewriterState = { completedWords: string[]; inProgress: string };

export const buildTypewriterFrames = (text: string) => {
  const frames: { state: TypewriterState; delay: number }[] = [];
  const done: string[] = [];
  let word = "";
  let elapsed = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i] ?? "";
    const isSpace = char === " ";
    const isLast = i === text.length - 1;

    elapsed += 65;

    if (isSpace) {
      done.push(word);
      word = "";
      frames.push({
        state: { completedWords: [...done], inProgress: "" },
        delay: elapsed,
      });
    } else {
      word += char;
      if (isLast) {
        done.push(word);
        frames.push({
          state: { completedWords: [...done], inProgress: "" },
          delay: elapsed,
        });
      } else {
        frames.push({
          state: { completedWords: [...done], inProgress: word },
          delay: elapsed,
        });
      }
    }
  }

  return frames;
};

export const useTypewriter = (text: string, active: boolean, seed: number) => {
  const [state, setState] = useState<TypewriterState>({
    completedWords: [],
    inProgress: "",
  });

  useEffect(() => {
    if (!active) {
      setState({ completedWords: [], inProgress: "" });
      return;
    }
    setState({ completedWords: [], inProgress: "" });
    const frames = buildTypewriterFrames(text);
    const ids = frames.map(({ state: s, delay }) =>
      setTimeout(() => setState(s), delay),
    );
    return () => ids.forEach(clearTimeout);
  }, [active, text, seed]);

  return state;
};
