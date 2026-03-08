import { type FC } from 'react'
import styled from 'styled-components'

type LayerProps = {
  $src: string
  $speed: number
  $offsetX: number
}

const Layer = styled.div<LayerProps>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: auto 100%;
  background-repeat: repeat-x;
  background-position: center bottom;
  transform: translateX(${({ $speed, $offsetX }) => $speed * $offsetX * 30}px);
  will-change: transform;
`

type Props = {
  layers: string[]
  parallaxX: number
}

export const ParallaxBackground: FC<Props> = ({ layers, parallaxX }) => (
  <>
    {layers.map((src, i) => (
      <Layer
        key={src}
        $src={src}
        $speed={(i + 1) * 0.5}
        $offsetX={parallaxX}
      />
    ))}
  </>
)
