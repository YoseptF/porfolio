import { type FC, useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { BalatroBackground } from '../../components/three/BalatroBackground';
import { SwirlCards } from '../../components/three/SwirlCards';
import { BurnOutFilter } from './BurnReveal';
import { theme } from '../../styles/theme';

interface IntroSequenceProps {
  onRevealStart: () => void;
  onComplete: () => void;
  cardTexture: string;
}

type Phase = 'card-only' | 'burn-out' | 'white-flash' | 'reveal' | 'done';

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
  filter: ${({ $burning }) => ($burning ? 'url(#burn-out-card)' : 'none')};
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

export const IntroSequence: FC<IntroSequenceProps> = ({ onRevealStart, onComplete, cardTexture }) => {
  const [phase, setPhase] = useState<Phase>('card-only');
  const [burnProgress, setBurnProgress] = useState(0);
  const [flashSize, setFlashSize] = useState('0vmax');
  const [revealOpacity, setRevealOpacity] = useState(1);
  const [skipClicks, setSkipClicks] = useState(0);

  const onRevealStartRef = useRef(onRevealStart);
  onRevealStartRef.current = onRevealStart;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const phaseRef = useRef<Phase>('card-only');
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

  // card-only → burn-out after 500ms
  useEffect(() => {
    const id = setTimeout(() => setPhase('burn-out'), 500);
    return () => clearTimeout(id);
  }, []);

  // white-flash → animate clip circle → reveal
  useEffect(() => {
    if (phase !== 'white-flash') return;
    onRevealStartRef.current();

    const duration = 800;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-in to make it feel like a rapid explosion
      const eased = t * t;
      setFlashSize(`${eased * 200}vmax`);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase('reveal');
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [phase]);

  // reveal → fade out → done
  useEffect(() => {
    if (phase !== 'reveal') return;
    setRevealOpacity(1);

    const id = setTimeout(() => {
      setRevealOpacity(0);
    }, 50);

    const completeId = setTimeout(() => {
      onCompleteRef.current();
      setPhase('done');
    }, 700);

    return () => {
      clearTimeout(id);
      clearTimeout(completeId);
    };
  }, [phase]);

  if (phase === 'done') return null;

  const bgOpacity = burnProgress >= 0.5 ? (burnProgress - 0.5) * 2 : 0;
  const swirlOpacity = bgOpacity;

  const dotRadius = `${burnProgress * 8}vw`;
  const dotOpacity = burnProgress * 0.9;

  const whiteDotStyle: React.CSSProperties =
    phase === 'burn-out'
      ? {
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${dotOpacity}) ${dotRadius}, transparent ${dotRadius})`,
        }
      : phase === 'white-flash'
      ? {
          background: 'white',
          clipPath: `circle(${flashSize} at 50% 50%)`,
        }
      : phase === 'reveal'
      ? {
          background: 'white',
          clipPath: `circle(200vmax at 50% 50%)`,
          opacity: revealOpacity,
          transition: 'opacity 0.65s ease-out',
        }
      : {};

  return (
    <Overlay onClick={handleClick}>
      <BurnOutFilter
        active={phase === 'burn-out'}
        onProgress={setBurnProgress}
        onComplete={() => setPhase('white-flash')}
      />

      <CanvasWrapper $opacity={bgOpacity}>
        <Canvas
          gl={{ antialias: false }}
          dpr={[1, 2]}
          style={{ position: 'absolute', inset: 0 }}
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
        $burning={phase === 'burn-out'}
      />

      <WhiteDotOverlay style={whiteDotStyle} />

      <SkipHint>
        {skipClicks > 0
          ? `click anywhere × ${3 - skipClicks} to skip`
          : 'click anywhere × 3 to skip'}
      </SkipHint>
    </Overlay>
  );
};
