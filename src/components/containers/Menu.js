import { HTML } from 'drei';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSpring } from 'react-spring';
import { useFrame } from 'react-three-fiber';
import { updateScene } from '../../features/scene';
import * as S from '../presentational/App.styles';

const showTips = localStorage.getItem('tips');

const Menu = () => {
  const [tips, setTips] = useState(showTips);
  const [{ mouseX }, setSpring] = useSpring(() => ({
    mouseX: 0,
  }));
  const dispatch = useDispatch();

  useFrame(({ mouse }) => {
    setSpring({
      mouseX: mouse.x,
    });
  });

  const followMouse = {
    transform: mouseX.interpolate(mX => `rotate3d(0,1,0,${mX * 25}deg)`),
  };

  const handleClick = e => {
    dispatch(updateScene(+e.target.dataset.scene));
  };

  const hideTips = () => {
    localStorage.setItem('tips', true);
    setTips(true);
  };

  return (
    <HTML>
      <S.UI>
        {!tips
        && (
        <div className="info" onPointerDown={hideTips}>
          <span>rigthClick | 2 fingers = span</span>
          <span>scroll | pinch = zoom</span>
          <span>click things around, they do stuff :0</span>
          <br />
          <span>Click me to hide</span>
        </div>
        )}
        <S.Menu>
          <li>
            <S.Button data-scene={1} type="button" style={followMouse} title="Home" onClick={handleClick}>
              <i className="fas fa-home" data-scene={1} />
            </S.Button>
          </li>
          <li>
            <S.Button data-scene={2} type="button" style={followMouse} title="Portfolio" onClick={handleClick}>
              <i className="fas fa-folder" data-scene={2} />
            </S.Button>
          </li>
          <li>
            <S.Button data-scene={3} type="button" style={followMouse} title="Portfolio" onClick={handleClick}>
              <i className="fas fa-envelope-open" data-scene={3} />
            </S.Button>
          </li>
        </S.Menu>
        <S.Social>
          <li>
            <a href="https://www.linkedin.com/in/joseph-flores-vega/">
              <i className="fab fa-linkedin" />
            </a>
          </li>
          <li>
            <a href="https://github.com/YoseptF">
              <i className="fab fa-github-square" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/Yosept__">
              <i className="fab fa-twitter-square" />
            </a>
          </li>
        </S.Social>
      </S.UI>
    </HTML>
  );
};

export default Menu;
