import { type FC } from 'react'
import styled, { keyframes } from 'styled-components'

const flicker = keyframes`
  0% { opacity: 0.03; }
  5% { opacity: 0.02; }
  10% { opacity: 0.03; }
  15% { opacity: 0.04; }
  20% { opacity: 0.02; }
  100% { opacity: 0.03; }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15) 0px,
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 3px
    );
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 60%,
      rgba(0, 0, 0, 0.4) 100%
    );
    animation: ${flicker} 4s infinite;
  }
`

export const CRTOverlay: FC = () => <Overlay />
