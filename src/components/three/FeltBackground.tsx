import { type FC, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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
  const { gl } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Vector3(...color) },
      uResolution: { value: new THREE.Vector2(gl.domElement.width, gl.domElement.height) },
    }),
    [],
  )

  useFrame((_state, delta) => {
    const mat = materialRef.current
    if (!mat) return
    const u = mat.uniforms
    if (u.uTime) u.uTime.value += delta
    if (u.uResolution) u.uResolution.value.set(gl.domElement.width, gl.domElement.height)
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
