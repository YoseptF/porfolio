/* eslint-disable global-require */
import { useBox } from 'use-cannon';
import React from 'react';
import PropTypes, { number } from 'prop-types';
import { useLoader } from 'react-three-fiber';
import { TextureLoader } from 'three';

const Box = ({ position, texture }) => {
  const map = useLoader(TextureLoader, `cubes/${texture}.png`);
  // Register box as a physics body with mass
  const [ref, api] = useBox(() => ({
    mass: 3000,
    position,
    rotation: [
      Math.PI / (Math.random() * 2),
      Math.PI / (Math.random() * 2),
      Math.PI / (Math.random() * 2),
    ],
  }));

  const handleClick = () => {
    api.velocity.set(0, 0, 35);
    api.angularVelocity.set(
      (Math.random() * 20) - 10,
      (Math.random() * 20) - 10,
      (Math.random() * 20) - 10,
    );
  };

  return (
    <mesh ref={ref} onPointerUp={handleClick}>
      <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <meshPhongMaterial attach="material" map={map} />
    </mesh>
  );
};

Box.defaultProps = {
  position: [0, 0, 0],
  texture: 'placeholder',
};

Box.propTypes = {
  position: PropTypes.arrayOf(number),
  texture: PropTypes.string,
};

export default Box;
