import React from 'react';
import './App.css';
import { Canvas } from 'react-three-fiber';
import { Physics } from 'use-cannon';
import { Provider } from 'react-redux';
import Skybox from '../presentational/Skybox';
import ContactGround from '../presentational/ContactGround';
import Controls from './Controls';
import Store from '../../store';
import Menu from './Menu';
import Home from './Home';
import Portfolio from './Portfolio';
import Contact from './Contact';

const { width, height } = window.screen;
let standZInit;
if (width > height) { standZInit = 20; } else standZInit = 45;

const App = () => (
  <Canvas
    camera={{ position: [0, 0, standZInit], fov: 110 }}
    shadowMap
    style={{
      position: 'fixed',
      margin: 0,
      padding: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }}
  >
    <Provider store={Store}>

      <Skybox />
      <Controls />
      <ambientLight intensity={0.7} />

      <Physics
        iterations={20}
        tolerance={0.0001}
        defaultContactMaterial={{
          friction: 1,
          restitution: 0,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2,

        }}
        gravity={[0, 0, -70]}
        allowSleep={false}
      >
        <ContactGround />
        <Home />
        <Portfolio />
        <Contact />
      </Physics>
      <Menu />
    </Provider>
  </Canvas>
);

export default App;
