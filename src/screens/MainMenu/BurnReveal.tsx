import { useEffect, useRef, type FC } from 'react';

const BURN_SEED = Math.floor(Math.random() * 10000);
const DURATION_MS = 2400;

export const BurnRevealFilter: FC = () => {
  const mainRef = useRef<SVGFEColorMatrixElement>(null);
  const edgeRef = useRef<SVGFEColorMatrixElement>(null);

  useEffect(() => {
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const raw = Math.min((now - start) / DURATION_MS, 1);
      const t = 1 - Math.pow(1 - raw, 2.5);

      // noise.R is in [0,1]; alpha_out = 50*R + bias
      // bias -43 → ~14% visible (sparse sparks at start)
      // bias  +5 → 100% visible
      const mainBias = -43 + 48 * t;
      const edgeBias = mainBias - 2; // lags main to define the fire frontier

      const vals = (b: number) =>
        `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  50 0 0 0 ${b.toFixed(2)}`;

      mainRef.current?.setAttribute('values', vals(mainBias));
      edgeRef.current?.setAttribute('values', vals(edgeBias));

      if (raw < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="burn-reveal" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025 0.028"
            numOctaves="5"
            seed={BURN_SEED}
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

          {/* frontier = thin noise band between main and edge thresholds */}
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
        </filter>
      </defs>
    </svg>
  );
};
