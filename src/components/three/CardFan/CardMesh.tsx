import { type FC, useRef, useState, useCallback } from 'react'
import { animated, useSpring } from '@react-spring/three'
import * as THREE from 'three'

export const SPREAD_ANGLE = 30
export const ARC_RADIUS = 3.5
export const CARD_WIDTH = 0.8
export const CARD_HEIGHT = 1.12

interface CardMeshProps {
  texture: THREE.Texture
  index: number
  total: number
  selected: boolean
  onSelect: (index: number) => void
}

export const CardMesh: FC<CardMeshProps> = ({ texture, index, total, selected, onSelect }) => {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  const centerOffset = index - (total - 1) / 2
  const angleRad = (centerOffset / (total - 1)) * SPREAD_ANGLE * (Math.PI / 180)
  const baseX = Math.sin(angleRad) * ARC_RADIUS
  const baseY = -Math.cos(angleRad) * ARC_RADIUS + ARC_RADIUS - 1.5
  const baseZ = index * 0.01

  const { posY, scale } = useSpring({
    posY: selected ? baseY + 0.5 : hovered ? baseY + 0.15 : baseY,
    scale: hovered ? 1.02 : 1,
    config: { tension: 300, friction: 20 },
  })

  const handlePointerOver = useCallback(() => setHovered(true), [])
  const handlePointerOut = useCallback(() => setHovered(false), [])
  const handleClick = useCallback(() => onSelect(index), [index, onSelect])

  return (
    <animated.mesh
      ref={meshRef}
      position-x={baseX}
      position-y={posY}
      position-z={baseZ}
      rotation-z={-angleRad * 0.6}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
      {selected && (
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[CARD_WIDTH + 0.06, CARD_HEIGHT + 0.06]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.3} />
        </mesh>
      )}
    </animated.mesh>
  )
}
