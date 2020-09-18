import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  0%{
    transform: scale(0);
  }
  100%{
    transform: scale(1);
  }
`;

const CardInfo = styled.article`
  background: white;
  animation: ${appear} 500ms forwards ease-in-out;
  display: flex;
  padding: 10px;
  border-radius: 11px;
  a{
    background: red;
  }
  i{
    font-size: 2.5vmax;
    margin: 10px;
    color: #1d1d1d;
    transform: scale(1);
    transition: transform 300ms ease-in-out;
    &:hover{
      transform: scale(2);
      color: gold;
    }
  }
`;

export { CardInfo };
