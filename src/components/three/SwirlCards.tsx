import { type FC, useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { slowFilters } from '../../utils/browserCaps';
import {
  SWIRL_CARD_COUNT,
  SWIRL_CARD_COUNT_INITIAL,
  SWIRL_INITIAL_WINDOW_SECONDS,
  SWIRL_SPREAD_SECONDS,
  SWIRL_JOKER_COUNT,
  SWIRL_Z_START,
  SWIRL_Z_END,
  SWIRL_XY_RADIUS,
  SWIRL_TURNS,
  SWIRL_SPEED_BASE,
  SWIRL_SPEED_VARIANCE,
  SWIRL_CARD_WIDTH,
  SWIRL_CARD_HEIGHT,
} from '../../constants';

const CARD_COUNT = slowFilters ? 60 : SWIRL_CARD_COUNT;

interface SwirlCardsProps {
  opacity: number;
}

interface CardState {
  t: number;        // 0 = near camera, 1 = far/center
  angle: number;    // initial angle in the XY plane
  speed: number;    // travel speed (t/sec)
  tumbleAngle: number;
  tumbleSpeed: number;
}

export const SwirlCards: FC<SwirlCardsProps> = ({ opacity }) => {
  const meshRefs = useRef<THREE.Mesh[]>([]);

  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const back = loader.load('/jokers/back.png');
    const fronts = Array.from({ length: SWIRL_JOKER_COUNT }, (_, i) =>
      loader.load(`/jokers/${i + 1}.png`)
    );
    return { back, fronts };
  }, []);

  const materials = useMemo(() =>
    Array.from({ length: CARD_COUNT }, (_, i) => {
      const useBack = i % 4 === 0;
      const tex = useBack
        ? textures.back
        : textures.fronts[i % SWIRL_JOKER_COUNT] ?? textures.fronts[0];
      return new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.05,
        side: THREE.DoubleSide,
        opacity: 0,
      });
    }),
  [textures]);

  const cardStates = useRef<CardState[]>([]);

  useEffect(() => {
    cardStates.current = Array.from({ length: CARD_COUNT }, (_, i) => {
      const speed = SWIRL_SPEED_BASE + Math.random() * SWIRL_SPEED_VARIANCE;

      // First batch enters within the initial window; later cards trickle in evenly across the full intro
      const delaySecs = i < SWIRL_CARD_COUNT_INITIAL
        ? (i / SWIRL_CARD_COUNT_INITIAL) * SWIRL_INITIAL_WINDOW_SECONDS + Math.random() * 0.2
        : SWIRL_INITIAL_WINDOW_SECONDS + ((i - SWIRL_CARD_COUNT_INITIAL) / (SWIRL_CARD_COUNT - SWIRL_CARD_COUNT_INITIAL)) * (SWIRL_SPREAD_SECONDS - SWIRL_INITIAL_WINDOW_SECONDS) + Math.random() * 0.5;

      return {
        t: -delaySecs * speed,
        angle: Math.random() * Math.PI * 2,
        speed,
        tumbleAngle: Math.random() * Math.PI * 2,
        tumbleSpeed: (Math.random() < 0.5 ? 1 : -1) * (1.2 + Math.random() * 2.5),
      };
    });
  }, []);

  useFrame((_state, delta) => {
    cardStates.current.forEach((s, i) => {
      s.t += s.speed * delta;

      const mat = materials[i];
      const mesh = meshRefs.current[i];

      // Still in the queue — keep invisible and skip positioning
      if (s.t < 0) {
        if (mat) mat.opacity = 0;
        return;
      }

      if (s.t >= 1) {
        // After first pass, loop continuously with a small random delay
        s.t = -(Math.random() * 0.3);
        s.angle = Math.random() * Math.PI * 2;
        if (mat) mat.opacity = 0;
        return;
      }

      s.tumbleAngle += s.tumbleSpeed * delta;

      const swirl = s.angle + s.t * SWIRL_TURNS * Math.PI * 2;
      const radius = (1 - s.t) * SWIRL_XY_RADIUS;

      const x = Math.cos(swirl) * radius;
      const y = Math.sin(swirl) * radius * 0.55;
      const z = SWIRL_Z_START + s.t * (SWIRL_Z_END - SWIRL_Z_START);

      if (!mesh) return;

      mesh.position.set(x, y, z);

      const tangent = swirl + Math.PI / 2;
      mesh.rotation.set(
        s.t * 0.4,
        s.tumbleAngle,
        tangent,
      );

      if (mat) {
        const fade = Math.min((1 - s.t) / 0.2, 1);
        const fadeIn = Math.min(s.t / 0.05, 1);
        mat.opacity = opacity * fade * fadeIn;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: CARD_COUNT }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshRefs.current[i] = el; }}
          material={materials[i]}
        >
          <planeGeometry args={[SWIRL_CARD_WIDTH, SWIRL_CARD_HEIGHT]} />
        </mesh>
      ))}
    </group>
  );
};
