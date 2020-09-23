import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';
import { useBox } from 'use-cannon';
import PropTypes, { number } from 'prop-types';
import { Html } from 'drei';
import CardInfo from './CardInfo';

const Card = ({
  texture, position, vertical, double, demo, github, layer, random, size,
}) => {
  const map = useLoader(THREE.TextureLoader, `cards/${texture}.png`);
  const [active, setActive] = useState(false);
  const [ref, api] = useBox(() => ({
    mass: 1e4,
    position,
    rotation: [
      0,
      0,
      vertical ? Math.PI / ((Math.random() * 0.4) + 1.8)
        : Math.PI / ((Math.random() * 0.006) + 0.247),
    ],
  }));

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 1500);
  }, []);

  const handleClick = e => {
    if (isReady) {
      const [{ type }, { 'data-link': dataLink, className = '' }] = Object.values(e.target);
      if (className.includes('cardI')) window.open(dataLink, '_blank');
      if (type === 'canvas') {
        api.velocity.set(0, 0, 25);
        api.angularVelocity.set(0, 0, (Math.random() * 2) - 1);
        setActive(!active);
      }
    }
  };

  const shake = () => {
    if (isReady) {
      api.velocity.set(0, 0, 7);
      api.angularVelocity.set((
        Math.random() * 1) - 0.5,
      (Math.random() * 1) - 0.5,
      0);
    }
  };

  return (
    <mesh ref={ref} onPointerUp={handleClick} layers={layer} onPointerOver={shake}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshPhongMaterial attach="material" map={map} />
      {(active && double) && (
      <Html center>
        <CardInfo demo={demo} github={github} />
      </Html>
      )}
    </mesh>
  );
};

Card.propTypes = {
  texture: PropTypes.string,
  position: PropTypes.arrayOf(number),
  vertical: PropTypes.bool,
  double: PropTypes.bool,
  demo: PropTypes.string,
  github: PropTypes.string,
  random: PropTypes.bool,
  size: PropTypes.arrayOf(number),
};

Card.defaultProps = {
  texture: 'placeholder',
  position: [0, 0, 0],
  vertical: false,
  double: false,
  demo: 'https://google.com',
  github: 'https://github.com/YoseptF',
  random: false,
  size: [43, 20, 0],
};

export default Card;
