import styled from 'styled-components';

const FormWrapper = styled.section`
  width: 100vw;
  max-width: 360px;
  background: white;
  transform: translate(0,2rem);
  @media only screen and (min-width: 768px){
  max-width: 540px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  header{
    display: flex;
    align-items: center;
    .image{
    width: 10vmax;
    height: 10vmax;
    background: ${props => `url(${props.image})`} center center/cover no-repeat;
  }
  }

  input{
    font-weight: bold;
  }

  input, textarea{
      border: 1px solid black;
      border-radius: 11px;
      font-size: 2vh;
      margin: 0.7rem;
      padding: 1vh;
      line-height: 2vh;
      &:focus{
      outline: none;
      }
  }

  textarea{
    min-height: 190px;
  }
`;

export { FormWrapper, ContactForm };
