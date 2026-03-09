import { type FC } from 'react'
import styled from 'styled-components'

type LayerProps = {
  $src: string
  $offsetX: number
  $speedFactor: number
  $brightness: number
  $zIndex: number
  $heightPercent: number
}

const Layer = styled.div<LayerProps>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: auto ${({ $heightPercent }) => $heightPercent}%;
  background-repeat: repeat-x;
  background-position-x: ${({ $offsetX, $speedFactor }) => -$offsetX * $speedFactor}px;
  background-position-y: bottom;
  will-change: background-position-x;
  filter: brightness(${({ $brightness }) => $brightness});
  z-index: ${({ $zIndex }) => $zIndex};
`

type Props = {
  layers: string[]
  offsetX: number
  brightness: number
  zIndexStart: number
  // Offset into the full layer array so speed factors stay continuous across the back/front split
  layerIndexOffset?: number
}

export const ParallaxBackground: FC<Props> = ({
  layers,
  offsetX,
  brightness,
  zIndexStart,
  layerIndexOffset = 0,
}) => (
  <>
    {layers.map((src, i) => {
      // far=55%, mid=70%, near=85% — each depth layer is taller than the one behind it
      const totalIdx = layerIndexOffset + i
      const heightPercent = 55 + totalIdx * 15
      return (
        <Layer
          key={src}
          $src={src}
          $offsetX={offsetX}
          $speedFactor={(totalIdx + 1) * 0.6}
          $brightness={brightness}
          $zIndex={zIndexStart + i}
          $heightPercent={heightPercent}
        />
      )
    })}
  </>
)
