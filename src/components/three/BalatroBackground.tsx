import { type FC, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from '../../assets/shaders/balatro-bg.vert'
import fragmentShader from '../../assets/shaders/balatro-bg.frag'

interface BalatroBackgroundProps {
  color1?: [number, number, number, number]
  color2?: [number, number, number, number]
  color3?: [number, number, number, number]
  contrast?: number
  spinAmount?: number
  spinSpeed?: number
  pixelFilter?: number
  spinEase?: number
  zoom?: number
}

export const BalatroBackground: FC<BalatroBackgroundProps> = ({
  color1 = [0.9, 0.1, 0.1, 1.0],
  color2 = [0.1, 0.3, 0.85, 1.0],
  color3 = [0.02, 0.02, 0.04, 1.0],
  contrast = 1.2,
  spinAmount = 0.5,
  spinSpeed = 1.0,
  pixelFilter = 1000.0,
  spinEase = 0.5,
  zoom = 30.0,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { gl } = useThree()

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      spin_time: { value: 0 },
      contrast: { value: contrast },
      spin_amount: { value: spinAmount },
      pixel_fac: { value: pixelFilter },
      spin_ease: { value: spinEase },
      zoom: { value: zoom },
      offset: { value: new THREE.Vector2(-0.12, 0) },
      resolution: { value: new THREE.Vector2(gl.domElement.width, gl.domElement.height) },
      colour_1: { value: new THREE.Vector4(...color1) },
      colour_2: { value: new THREE.Vector4(...color2) },
      colour_3: { value: new THREE.Vector4(...color3) },
    }),
    [],
  )

  useFrame((_state, delta) => {
    const mat = materialRef.current
    if (!mat) return
    const u = mat.uniforms
    if (u.time) u.time.value += delta
    if (u.spin_time) u.spin_time.value += delta * spinSpeed
    if (u.resolution) u.resolution.value.set(gl.domElement.width, gl.domElement.height)
  })

  return (
    <mesh renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
