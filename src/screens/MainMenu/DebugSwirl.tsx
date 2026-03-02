import { type FC, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { BalatroBackground } from '../../components/three/BalatroBackground';
import { SwirlCards } from '../../components/three/SwirlCards';
import { theme } from '../../styles/theme';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: #111e21;
`;

const Controls = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Btn = styled.button`
  font-family: ${theme.font.family};
  font-size: 0.85rem;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 12px;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Label = styled.div`
  font-family: ${theme.font.family};
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
`;

export const DebugSwirl: FC = () => {
  const [key, setKey] = useState(0);
  const [opacity, setOpacity] = useState(1);

  return (
    <Overlay>
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
        <SwirlCards key={key} opacity={opacity} />
      </Canvas>

      <Controls>
        <Label>DEBUG: swirl</Label>
        <Btn onClick={() => setKey((k) => k + 1)}>↺ restart</Btn>
        <Btn onClick={() => setOpacity((o) => (o === 1 ? 0.3 : 1))}>
          opacity: {opacity === 1 ? '100%' : '30%'}
        </Btn>
      </Controls>
    </Overlay>
  );
};
