import { type FC, Suspense, useCallback } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { BalatroBackground } from '../components/three/BalatroBackground'
import { CardFan } from '../components/three/CardFan'
import { ProjectSidebar } from '../components/ui/ProjectSidebar'
import { ActionButtons } from '../components/ui/ActionButtons'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectProject, selectSelectedProjectIndex } from '../store/slices/navigation'

export const PROJECT_BG_CONFIG = {
  color1: [0.15, 0.72, 0.52, 1.0] as [number, number, number, number],
  color2: [0.04, 0.22, 0.16, 1.0] as [number, number, number, number],
  color3: [0.02, 0.07, 0.05, 1.0] as [number, number, number, number],
  spinAmount: 0.25,
  spinSpeed: 0.5,
  spinEase: 0.5,
  contrast: 1.2,
  pixelFilter: 1000.0,
  zoom: 30.0,
} as const

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`

export const Projects: FC = () => {
  const dispatch = useAppDispatch()
  const selectedIndex = useAppSelector(selectSelectedProjectIndex)

  const handleSelect = useCallback(
    (index: number | null) => {
      dispatch(selectProject(index))
    },
    [dispatch],
  )

  return (
    <Wrapper>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <BalatroBackground {...PROJECT_BG_CONFIG} />
        <Suspense fallback={null}>
          <CardFan selectedIndex={selectedIndex} onSelect={handleSelect} />
        </Suspense>
      </Canvas>

      <Overlay>
        <ProjectSidebar selectedIndex={selectedIndex} />
        <ActionButtons selectedIndex={selectedIndex} />
      </Overlay>
    </Wrapper>
  )
}
