import { type FC } from 'react'
import styled from 'styled-components'
import { BG_LAYER_HEIGHTS, BG_LAYER_Y_POS } from '../../constants'

type LayerProps = {
  $src: string
  $zIndex: number
  $height: string
  $posY: string
}

const Layer = styled.div<LayerProps>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: auto ${({ $height }) => $height};
  background-repeat: repeat-x;
  background-position-y: ${({ $posY }) => $posY};
  will-change: background-position-x;
  z-index: ${({ $zIndex }) => $zIndex};
  pointer-events: none;
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
      const totalIdx = layerIndexOffset + i
      const height = BG_LAYER_HEIGHTS[totalIdx] ?? 'auto'
      const posY = BG_LAYER_Y_POS[totalIdx] ?? 'bottom'
      const speedFactor = (totalIdx + 1) * 0.6
      return (
        <Layer
          key={src}
          $src={src}
          $zIndex={zIndexStart + i}
          $height={height}
          $posY={posY}
          style={{
            backgroundPositionX: `${-offsetX * speedFactor}px`,
            filter: `brightness(${brightness})`,
          }}
        />
      )
    })}
  </>
)
