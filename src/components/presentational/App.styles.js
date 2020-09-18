import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';

const appear = keyframes`
  50%,
  0% {
    transform: scale(0) translate(0.7rem,0px);
  }
  100%{
    transform: scale(1) translate(0.7rem,0px);
  }
`;

const UI = styled.section`
  background: #181818;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  position: relative;
  .info {
    cursor: pointer;
    color: white;
    border-radius: 11px;
    border: 2px solid red;
    transform: translate(330px, 30px);
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    span{
      display: block;
      min-width: 260px;
    }
    
    @media only screen and (orientation:portrait){
      transform: translate(-15px,calc(100vh - 140px));
    }
  }

  @media only screen and (orientation: portrait){
    flex-direction: row;
    height: 70px;
    width: 100vw;
  }
`;

const Menu = styled(animated.ul)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  flex-grow: 1;
  padding: 0.4rem;
  @media only screen and (orientation: portrait){
    flex-direction: row;
  }
`;

const Button = styled(animated.button)`
  font-weight: bold;
  text-align :center;
  margin: 1rem;
  background: none;
  border: none;
  &:focus{
      outline: none;
    }
  i{
    cursor: pointer;
    color: #08fdd8;
    font-size: 1.3rem;
    transform: scale(1) rotate(0deg);
    transition: transform 300ms ease-in-out, color 300ms ease-in-out;
    &:focus{
      outline: none;
    }
    &:after{
      position: absolute;
      content: '${props => props.title}';
      font-family: Roboto, serif;
      letter-spacing: 1px;
      transform: scale(0);
    }
    &:hover{
      transform: scale(2) rotate(365deg);
      color: #fff;
      &:after{
        animation: ${appear} 500ms forwards;
        @media only screen and (orientation: portrait){
        display: none;
        }
      }
    }
  }
`;

const Social = styled.ul`
  list-style: none;
  border-top: 1px solid #08fdd8;
  display: flex;
  flex-direction: column;
  i{
    cursor: pointer;
    text-align :center;
    margin: 1rem;
    background: none;
    border: none;
    font-size: 1.3rem;
    transform: scale(1);
    transition: transform 300ms ease-in-out;
    &:hover{
    transform: scale(2)
    }
  }
  a{
    color: #08fdd8;
    transform: scale(1) rotate(0deg);
    transition: transform 300ms ease-in-out, color 300ms ease-in-out;
    @media only screen and (orientation: portrait){
      margin: 0 1rem;
    }
  }
  @media only screen and (orientation: portrait){
  border-top: none;
  border-left: 1px solid #08fdd8;
  flex-direction: row;
  margin: 0 1rem;
  i{
    margin: 0;
  }
  }
`;

export {
  Menu, UI, Button, Social,
};
