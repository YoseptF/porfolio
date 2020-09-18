import React from 'react';
import Card from '../presentational/Card';

const Portfolio = () => (
  <>
    <Card
      position={[120, 110, 0]}
      texture="myeat"
      double
      demo="https://my-eat-list.netlify.app/"
      github="https://github.com/YoseptF/my-eat-list-frontend"
    />
    <Card texture="workout" size={[20, 20, 0]} position={[165, 120, 0]} />
    <Card
      position={[130, 80, 0]}
      texture="twitch"
      double
      demo="https://twitch-points-suite.netlify.app/"
      github="https://github.com/YoseptF/Twitch-Points-Song-Request"
    />
    <Card
      position={[110, 50, 0]}
      texture="lifestyle"
      double
      demo="https://aqueous-springs-55430.herokuapp.com/"
      github="https://github.com/YoseptF/lifestyle"
    />
    <Card texture="coffe" size={[20, 20, 0]} position={[165, 30, 0]} />
    <Card
      position={[60, 120, 0]}
      texture="jumper"
      vertical
      double
      demo="https://endless-jumper.netlify.app/"
      github="https://github.com/YoseptF/Endless-Jumper"
    />
    <Card
      position={[70, 80, 0]}
      texture="animal"
      double
      demo="https://acnh-catalog.herokuapp.com/"
      github="https://github.com/YoseptF/acnh-catalog"
    />
    <Card
      position={[60, 40, 0]}
      texture="game"
      double
      demo="https://gamesxchange.herokuapp.com/"
      github="https://github.com/YoseptF/gamexchange"
    />
  </>

);

export default Portfolio;
