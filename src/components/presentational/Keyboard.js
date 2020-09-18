import React from 'react';
import { useLoader } from 'react-three-fiber';
import { useBox } from 'use-cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import PropTypes, { number } from 'prop-types';

const Keyboard = ({ position }) => {
  const [ref, api] = useBox(() => ({
    mass: 1e4,
    args: [1, 1, 1],
    rotation: [Math.PI / 2, Math.PI / 0.9, 0],
    position,

  }));

  const { materials, nodes } = useLoader(GLTFLoader, '/objects/Keyboard.glb');

  const handleClick = () => {
    api.angularVelocity.set(0, 0, (Math.random() * 1) - 0.5);
    api.velocity.set(0, 0, 25);
  };

  return (
    <mesh ref={ref} onPointerUp={handleClick}>
      <group scale={[25, 1, 11]}>
        <mesh material={materials.TextKey} geometry={nodes.whole_5.geometry} />
        <mesh geometry={nodes.whole_0.geometry}>
          <meshBasicMaterial attach="material" color="#675959" />
        </mesh>
      </group>
    </mesh>
  );
};

Keyboard.defaultProps = {
  position: [-45, 30, 0],
};

Keyboard.propTypes = {
  position: PropTypes.arrayOf(number),
};

export default Keyboard;
