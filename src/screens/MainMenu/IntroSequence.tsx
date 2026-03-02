import { type FC, useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { BalatroBackground } from "../../components/three/BalatroBackground";
import { SwirlCards } from "../../components/three/SwirlCards";
import { BurnOutFilter } from "./BurnReveal";
import { theme } from "../../styles/theme";

interface IntroSequenceProps {
  onRevealStart: () => void;
  onComplete: () => void;
  cardTexture: string;
}

type Phase = "card-only" | "burn-out" | "white-flash" | "reveal" | "done";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: #111e21;
  overflow: hidden;
`;

const CanvasWrapper = styled.div<{ $opacity: number }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $opacity }) => $opacity};
  transition: none;
`;

const IntroCard = styled.img<{ $burning: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 17vw;
  min-width: 150px;
  max-width: 240px;
  height: auto;
  filter: ${({ $burning }) => ($burning ? "url(#burn-out-card)" : "none")};
  z-index: 2;
  pointer-events: none;
  user-select: none;

  @media (max-width: 600px) {
    width: 28vw;
    min-width: 100px;
  }
`;

const WhiteDotOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
`;

const SkipHint = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  font-family: ${theme.font.family};
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  text-align: right;
  line-height: 1.4;
  letter-spacing: 1px;
  pointer-events: none;
  z-index: 10;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
`;

export const IntroSequence: FC<IntroSequenceProps> = ({
  onRevealStart,
  onComplete,
  cardTexture,
}) => {
  const [phase, setPhase] = useState<Phase>("burn-out");
  const [burnProgress, setBurnProgress] = useState(0);
  const [flashProgress, setFlashProgress] = useState(0);
  const [revealOpacity, setRevealOpacity] = useState(1);
  const [skipClicks, setSkipClicks] = useState(0);

  const onRevealStartRef = useRef(onRevealStart);
  onRevealStartRef.current = onRevealStart;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const phaseRef = useRef<Phase>("burn-out");
  phaseRef.current = phase;

  const doSkip = useCallback(() => {
    onRevealStartRef.current();
    onCompleteRef.current();
  }, []);

  const handleClick = useCallback(() => {
    setSkipClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) doSkip();
      return next;
    });
  }, [doSkip]);


  // white-flash → animate clip circle → reveal
  useEffect(() => {
    if (phase !== "white-flash") return;
    onRevealStartRef.current();

    const duration = 800;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-in to make it feel like a rapid explosion
      const eased = t * t;
      setFlashProgress(eased);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase("reveal");
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [phase]);

  // reveal → fade out → done
  useEffect(() => {
    if (phase !== "reveal") return;
    setRevealOpacity(1);

    const id = setTimeout(() => {
      setRevealOpacity(0);
    }, 50);

    const completeId = setTimeout(() => {
      onCompleteRef.current();
      setPhase("done");
    }, 700);

    return () => {
      clearTimeout(id);
      clearTimeout(completeId);
    };
  }, [phase]);

  if (phase === "done") return null;

  // Canvas fades in at burn-out start, then fades out as the flash expands
  const bgOpacity =
    phase === 'burn-out' ? Math.min(burnProgress / 0.08, 1) :
    phase === 'white-flash' ? Math.max(1 - flashProgress * 2, 0) :
    0;
  const swirlOpacity = bgOpacity;

  const s = burnProgress;
  // Snap to full brightness almost immediately — looks blinding from the first frames.
  const bright = Math.min(s / 0.05, 1);

  const makeSunGlow = (size: number, extraBright: number) => {
    const b = Math.min(bright * extraBright, 1);
    return [
      // Very faint warm tinge only at the extreme outer edge — everything else is white
      `radial-gradient(ellipse 120% 90% at 51% 50%, rgba(255,240,220,${b * 0.12}) 0%, transparent ${size * 30}vw)`,
      // Large white bloom — pure white haze flooding outward
      `radial-gradient(circle at 50% 50%, rgba(255,255,255,${b * 0.9}) 0%, rgba(255,255,255,${b * 0.55}) ${size * 8}vw, transparent ${size * 20}vw)`,
      // Blinding white core
      `radial-gradient(circle at 50% 50%, rgba(255,255,255,${b}) 0%, rgba(255,255,255,${b}) ${size * 3}vw, rgba(255,255,255,${b * 0.85}) ${size * 6}vw, transparent ${size * 14}vw)`,
    ].join(", ");
  };

  const whiteDotStyle: React.CSSProperties =
    phase === "burn-out"
      ? { background: makeSunGlow(0.01 + Math.pow(s, 0.2) * 0.89, 1) }
      : phase === "white-flash"
        ? {
            // Expanding sun bloom — same gradient but rapidly growing, no hard disc edge
            background: makeSunGlow(
              1 + flashProgress * 12,
              1 + flashProgress * 4,
            ),
          }
        : phase === "reveal"
          ? { background: makeSunGlow(13, 5) }
          : {};

  const overlayOpacity = phase === 'reveal' ? revealOpacity : 1;

  return (
    <Overlay onClick={handleClick} style={{ opacity: overlayOpacity, transition: phase === 'reveal' ? 'opacity 0.65s ease-out' : 'none' }}>
      <BurnOutFilter
        active={phase === "burn-out"}
        onProgress={setBurnProgress}
        onComplete={() => setPhase("white-flash")}
      />

      <CanvasWrapper $opacity={bgOpacity}>
        <Canvas
          gl={{ antialias: false }}
          dpr={[1, 2]}
          style={{ position: "absolute", inset: 0 }}
        >
          <BalatroBackground
            color1={[0.1, 0.3, 0.85, 1.0]}
            color2={[0.35, 0.35, 0.45, 1.0]}
            color3={[0.02, 0.03, 0.07, 1.0]}
          />
          <SwirlCards opacity={swirlOpacity} />
        </Canvas>
      </CanvasWrapper>

      <IntroCard
        src={`/jokers/${cardTexture}.png`}
        alt="Intro card"
        $burning={true}
      />

      <WhiteDotOverlay style={whiteDotStyle} />

      <SkipHint>
        {skipClicks > 0
          ? `click anywhere × ${3 - skipClicks} to skip`
          : "click anywhere × 3 to skip"}
      </SkipHint>
    </Overlay>
  );
};
