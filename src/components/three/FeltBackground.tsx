import { type FC, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ScreenQuad } from '@react-three/drei'
import * as THREE from 'three'
import vertexShader from '../../assets/shaders/felt-bg.vert'
import fragmentShader from '../../assets/shaders/felt-bg.frag'

interface FeltBackgroundProps {
  color?: [number, number, number]
}

export const FeltBackground: FC<FeltBackgroundProps> = ({
  color = [0.21, 0.40, 0.30],
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Vector3(...color) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [],
  )

  useFrame((_state, delta) => {
    const mat = materialRef.current
    if (!mat) return
    const u = mat.uniforms
    if (u.uTime) u.uTime.value += delta
    if (u.uResolution) u.uResolution.value.set(size.width, size.height)
  })

  return (
    <ScreenQuad renderOrder={-1}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </ScreenQuad>
  )
}
