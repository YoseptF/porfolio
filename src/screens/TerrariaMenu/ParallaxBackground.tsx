import { type FC } from 'react'
import styled from 'styled-components'

type LayerProps = {
  $src: string
  $offsetX: number
  $speedFactor: number
}

const Layer = styled.div<LayerProps>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: auto 100%;
  background-repeat: repeat-x;
  background-position-x: ${({ $offsetX, $speedFactor }) => -$offsetX * $speedFactor}px;
  background-position-y: bottom;
  will-change: background-position-x;
`

const Container = styled.div<{ $brightness: number }>`
  position: absolute;
  inset: 0;
  filter: brightness(${({ $brightness }) => $brightness});
`

type Props = {
  layers: string[]
  offsetX: number
  brightness: number
}

export const ParallaxBackground: FC<Props> = ({ layers, offsetX, brightness }) => (
  <Container $brightness={brightness}>
    {layers.map((src, i) => (
      <Layer
        key={src}
        $src={src}
        $offsetX={offsetX}
        $speedFactor={(i + 1) * 0.6}
      />
    ))}
  </Container>
)
