import { type FC, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ScreenQuad } from '@react-three/drei'
import * as THREE from 'three'
import vertexShader from '../../assets/shaders/balatro-bg.vert'
import fragmentShader from '../../assets/shaders/balatro-bg.frag'

interface BalatroBackgroundProps {
  color1?: [number, number, number]
  color2?: [number, number, number]
  color3?: [number, number, number]
  contrast?: number
  spinAmount?: number
  spinSpeed?: number
  pixelFilter?: number
}

export const BalatroBackground: FC<BalatroBackgroundProps> = ({
  color1 = [0.91, 0.36, 0.29],
  color2 = [0.29, 0.59, 0.89],
  color3 = [0.03, 0.03, 0.06],
  contrast = 1.5,
  spinAmount = 6.0,
  spinSpeed = 0.4,
  pixelFilter = 200.0,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Vector3(...color1) },
      uColor2: { value: new THREE.Vector3(...color2) },
      uColor3: { value: new THREE.Vector3(...color3) },
      uContrast: { value: contrast },
      uSpinAmount: { value: spinAmount },
      uSpinSpeed: { value: spinSpeed },
      uPixelFilter: { value: pixelFilter },
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
