import { type FC, useCallback } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { projects } from '../../../data/projects'
import { CardMesh } from './CardMesh'

interface CardFanProps {
  selectedIndex: number | null
  onSelect: (index: number | null) => void
}

export const CardFan: FC<CardFanProps> = ({ selectedIndex, onSelect }) => {
  const { viewport } = useThree()
  const textures = useLoader(
    THREE.TextureLoader,
    projects.map((p) => `/cards/${p.texture}.png`),
  )

  const handleSelect = useCallback(
    (index: number) => {
      onSelect(selectedIndex === index ? null : index)
    },
    [selectedIndex, onSelect],
  )

  const scaleFactor = Math.min(viewport.width / 8, 1)

  return (
    <group position={[0, -viewport.height / 2 + 1.8, 0]} scale={scaleFactor}>
      {textures.map((tex, i) => (
        <CardMesh
          key={projects[i]?.name ?? i}
          texture={tex}
          index={i}
          total={projects.length}
          selected={selectedIndex === i}
          onSelect={handleSelect}
        />
      ))}
    </group>
  )
}
