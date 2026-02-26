import { type FC, Suspense, useCallback } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { FeltBackground } from '../components/three/FeltBackground'
import { CardFan } from '../components/three/CardFan'
import { ProjectSidebar } from '../components/ui/ProjectSidebar'
import { ActionButtons } from '../components/ui/ActionButtons'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectProject, selectSelectedProjectIndex } from '../store/slices/navigation'

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
        <FeltBackground />
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
