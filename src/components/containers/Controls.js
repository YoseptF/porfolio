import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useFrame, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useSpring } from 'react-spring/three';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectScene, updateScene,
} from '../../features/scene';

extend({ OrbitControls });

const { width, height } = window.screen;
let initialZ;
if (width > height) { initialZ = 20; } else initialZ = 45;

const Controls = () => {
  const [scene] = useSelector(selectScene);
  const dispatch = useDispatch();

  const touchEnabled = ('ontouchstart' in window)
  || (navigator.maxTouchPoints > 0)
  || (navigator.msMaxTouchPoints > 0);

  const [active, setActive] = useState(false);
  const activeRef = useRef();
  activeRef.current = active;

  const controls = useRef();
  const { camera, gl } = useThree();

  const [{
    x, y, standX, standY,
  }, setSpring] = useSpring(() => ({
    to: {
      x: 0,
      y: 0,
      z: 0,
      standX: 0,
      standY: 0,
    },
  }));

  const setCameraPosition = useCallback(() => {
    if (scene) {
      const [x, y] = scene;
      setSpring({
        standX: x,
        standY: y,
      });
      controls.current.target.y = initialZ;
    }
  }, [scene, setSpring]);

  useEffect(() => {
    document.addEventListener('pointerdown', e => {
      if (e.target.nodeName === 'CANVAS') {
        setActive(true);
      }
    });
    document.addEventListener('pointerup', e => {
      if (e.target.nodeName === 'CANVAS') {
        setActive(false);
        dispatch(updateScene(0));
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCameraPosition();
  }, [setCameraPosition]);

  useFrame(({ mouse }) => {
    if (!activeRef.current) {
      camera.position.x = standX.value - x.value;
      camera.position.y = standY.value - y.value;
      controls.current.target.x = standX.value;
      controls.current.target.y = standY.value;
    } else {
      standX.value = controls.current.target.x;
      standY.value = controls.current.target.y;
      setSpring({
        standX: controls.current.target.x,
        standY: controls.current.target.y,
        x: standX.value - camera.position.x,
        y: standY.value - camera.position.y,
      });
    }
    if (!touchEnabled) {
      setSpring({
        x: mouse.x,
        y: mouse.y,
      });
    }

    controls.current.update();
  });
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      // enableDamping
      // dampingFactor={0.05}
      // rotateSpeed={0.6}
      enablePan
      enableRotate={false}
    />
  );
};

export default Controls;
