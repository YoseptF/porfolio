import { useEffect, useRef, type FC, type RefObject } from 'react';
import { BURN_TITLE_DURATION_MS, BURN_CARD_DURATION_MS } from '../../constants';

const TITLE_SEED = Math.floor(Math.random() * 10000);
const CARD_SEED = Math.floor(Math.random() * 10000);

const useBurnAnimation = (
  mainRef: RefObject<SVGFEColorMatrixElement | null>,
  edgeRef: RefObject<SVGFEColorMatrixElement | null>,
  durationMs: number,
  onComplete?: () => void,
) => {
  // useRef keeps the callback stable so it never needs to be in effect deps
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const start = performance.now();
    let rafId: number;
    let fired = false;

    const tick = (now: number) => {
      const raw = Math.min((now - start) / durationMs, 1);
      const t = 1 - Math.pow(1 - raw, 2.5);
      const mainBias = -43 + 48 * t;
      const edgeBias = mainBias - 2;
      const vals = (b: number) =>
        `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  50 0 0 0 ${b.toFixed(2)}`;
      mainRef.current?.setAttribute('values', vals(mainBias));
      edgeRef.current?.setAttribute('values', vals(edgeBias));
      // Fire when all pixels are revealed (mainBias >= 0 means noise threshold is cleared).
      // This happens well before raw=1 due to ease-out, matching the visual completion moment.
      if (!fired && mainBias >= 0) {
        fired = true;
        onCompleteRef.current?.();
      }
      if (raw < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [durationMs, mainRef, edgeRef]);
};

const filterPrimitives = (
  mainRef: RefObject<SVGFEColorMatrixElement | null>,
  edgeRef: RefObject<SVGFEColorMatrixElement | null>,
  seed: number,
) => (
  <>
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.025 0.028"
      numOctaves="5"
      seed={seed}
      result="noise"
    />
    <feColorMatrix
      ref={mainRef}
      in="noise"
      type="matrix"
      values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  50 0 0 0 -43"
      result="burnMask"
    />
    <feComposite in="SourceGraphic" in2="burnMask" operator="in" result="clipped" />
    <feColorMatrix
      ref={edgeRef}
      in="noise"
      type="matrix"
      values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  50 0 0 0 -45"
      result="edgeMask"
    />
    <feComposite
      in="burnMask"
      in2="edgeMask"
      operator="arithmetic"
      k1="0"
      k2="1"
      k3="-1"
      k4="0"
      result="frontier"
    />
    <feFlood floodColor="#ff5500" floodOpacity="1" result="fireColor" />
    <feComposite in="fireColor" in2="frontier" operator="in" result="glowEdge" />
    <feGaussianBlur in="glowEdge" stdDeviation="5" result="glow" />
    <feMerge>
      <feMergeNode in="glow" />
      <feMergeNode in="clipped" />
    </feMerge>
  </>
);

export const BurnRevealFilter: FC<{ onCardComplete?: () => void }> = ({ onCardComplete }) => {
  const titleMainRef = useRef<SVGFEColorMatrixElement>(null);
  const titleEdgeRef = useRef<SVGFEColorMatrixElement>(null);
  const cardMainRef = useRef<SVGFEColorMatrixElement>(null);
  const cardEdgeRef = useRef<SVGFEColorMatrixElement>(null);

  useBurnAnimation(titleMainRef, titleEdgeRef, BURN_TITLE_DURATION_MS);
  useBurnAnimation(cardMainRef, cardEdgeRef, BURN_CARD_DURATION_MS, onCardComplete);

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="burn-reveal-title" x="-8%" y="-8%" width="116%" height="116%">
          {filterPrimitives(titleMainRef, titleEdgeRef, TITLE_SEED)}
        </filter>
        <filter id="burn-reveal-card" x="-8%" y="-8%" width="116%" height="116%">
          {filterPrimitives(cardMainRef, cardEdgeRef, CARD_SEED)}
        </filter>
      </defs>
    </svg>
  );
};
