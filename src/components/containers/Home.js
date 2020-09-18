import React from 'react';
import Box from '../presentational/Box';
import Card from '../presentational/Card';
import Keyboard from '../presentational/Keyboard';

const Home = () => (
  <>
    <Keyboard />
    <Card texture="presentation" />
    <Card texture="happy" size={[20, 20, 0]} position={[0, 40, 0]} />
    <Box position={[-30, 0, 0]} texture="react" />
    <Box position={[-45, -10, 0]} texture="javascript" />
    <Box position={[-40, 10, 0]} texture="rails" />
  </>

);

export default Home;
