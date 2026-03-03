import { useEffect, useRef, type FC, type RefObject } from 'react';
import { BURN_TITLE_DURATION_MS, BURN_CARD_DURATION_MS, BURN_CARD_OUT_DURATION_MS } from '../../constants';
import { slowFilters } from '../../utils/browserCaps';

const TITLE_SEED = Math.floor(Math.random() * 10000);
const CARD_SEED = Math.floor(Math.random() * 10000);
const CARD_OUT_SEED = Math.floor(Math.random() * 10000);

const OCTAVES = slowFilters ? 3 : 5;
const BLUR_SD = slowFilters ? 3 : 5;

const useBurnOutAnimation = (
  mainRef: RefObject<SVGFEColorMatrixElement | null>,
  edgeRef: RefObject<SVGFEColorMatrixElement | null>,
  durationMs: number,
  active: boolean,
  onComplete?: () => void,
  onProgress?: (progress: number) => void,
) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let rafId: number;
    let fired = false;

    const tick = (now: number) => {
      const raw = Math.min((now - start) / durationMs, 1);
      const t = 1 - Math.pow(1 - raw, 2.5);
      // Starts just above 0 so burning is visible within the first ~250ms.
      // mainBias < 0 is when noise pixels start disappearing — previously started at 48 which
      // meant 3 seconds of invisible "waiting" before any burn appeared.
      const mainBias = 3 - 46 * t;
      const edgeBias = mainBias + 2;
      const vals = (b: number) =>
        `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  50 0 0 0 ${b.toFixed(2)}`;
      mainRef.current?.setAttribute('values', vals(mainBias));
      edgeRef.current?.setAttribute('values', vals(edgeBias));
      onProgressRef.current?.(raw);
      if (!fired && raw >= 1) {
        fired = true;
        onCompleteRef.current?.();
      }
      if (raw < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [durationMs, mainRef, edgeRef, active]);
};

const filterPrimitives = (
  mainRef: RefObject<SVGFEColorMatrixElement | null>,
  edgeRef: RefObject<SVGFEColorMatrixElement | null>,
  seed: number,
  initialMainBias: number,
) => (
  <>
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.025 0.028"
      numOctaves={OCTAVES}
      seed={seed}
      result="noise"
    />
    <feColorMatrix
      ref={mainRef}
      in="noise"
      type="matrix"
      values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  50 0 0 0 ${initialMainBias.toFixed(2)}`}
      result="burnMask"
    />
    <feComposite in="SourceGraphic" in2="burnMask" operator="in" result="clipped" />
    <feColorMatrix
      ref={edgeRef}
      in="noise"
      type="matrix"
      values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  50 0 0 0 ${(initialMainBias - 2).toFixed(2)}`}
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
    <feGaussianBlur in="glowEdge" stdDeviation={BLUR_SD} result="glow" />
    <feMerge>
      <feMergeNode in="glow" />
      <feMergeNode in="clipped" />
    </feMerge>
  </>
);

export const BurnRevealFilter: FC<{ onCardComplete?: () => void; active?: boolean }> = ({
  onCardComplete,
  active = true,
}) => {
  const titleMainRef = useRef<SVGFEColorMatrixElement>(null);
  const titleEdgeRef = useRef<SVGFEColorMatrixElement>(null);
  const cardMainRef = useRef<SVGFEColorMatrixElement>(null);
  const cardEdgeRef = useRef<SVGFEColorMatrixElement>(null);
  const onCardCompleteRef = useRef(onCardComplete);
  onCardCompleteRef.current = onCardComplete;

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let rafId: number;
    let cardFired = false;

    const setVals = (ref: RefObject<SVGFEColorMatrixElement | null>, bias: number) =>
      ref.current?.setAttribute('values',
        `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  50 0 0 0 ${bias.toFixed(2)}`);

    const tick = (now: number) => {
      const rawTitle = Math.min((now - start) / BURN_TITLE_DURATION_MS, 1);
      const rawCard  = Math.min((now - start) / BURN_CARD_DURATION_MS, 1);
      const tTitle = 1 - Math.pow(1 - rawTitle, 2.5);
      const tCard  = 1 - Math.pow(1 - rawCard, 2.5);
      // -55 guarantees full transparency: A'=50*R+mainBias, max R=1 → 50-55=-5<0, no pixels leak
      const titleBias = -55 + 60 * tTitle;
      const cardBias  = -55 + 60 * tCard;
      setVals(titleMainRef, titleBias);
      setVals(titleEdgeRef, titleBias - 2);
      setVals(cardMainRef, cardBias);
      setVals(cardEdgeRef, cardBias - 2);
      if (!cardFired && cardBias >= 0) {
        cardFired = true;
        onCardCompleteRef.current?.();
      }
      if (rawTitle < 1 || rawCard < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active]);

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="burn-reveal-title" x="-8%" y="-8%" width="116%" height="116%">
          {filterPrimitives(titleMainRef, titleEdgeRef, TITLE_SEED, -55)}
        </filter>
        <filter id="burn-reveal-card" x="-8%" y="-8%" width="116%" height="116%">
          {filterPrimitives(cardMainRef, cardEdgeRef, CARD_SEED, -55)}
        </filter>
      </defs>
    </svg>
  );
};

export const BurnOutFilter: FC<{
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  active: boolean;
  durationMs?: number;
}> = ({ onComplete, onProgress, active, durationMs = BURN_CARD_OUT_DURATION_MS }) => {
  const mainRef = useRef<SVGFEColorMatrixElement>(null);
  const edgeRef = useRef<SVGFEColorMatrixElement>(null);

  useBurnOutAnimation(mainRef, edgeRef, durationMs, active, onComplete, onProgress);

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="burn-out-card" x="-8%" y="-8%" width="116%" height="116%">
          {filterPrimitives(mainRef, edgeRef, CARD_OUT_SEED, 3)}
        </filter>
      </defs>
    </svg>
  );
};
