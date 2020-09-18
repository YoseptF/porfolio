import { Html } from 'drei';
import React from 'react';
import PropTypes, { number } from 'prop-types';
import * as S from './ContactForm.styles';

const ContactForm = ({ position }) => (
  <Html position={position} center>
    <S.FormWrapper>
      <S.ContactForm action="https://formspree.io/xvovpedq" method="POST" image="https://i.imgur.com/tp2D1KG.png">
        <header>
          <div className="image" />
          <h1>Send me a message!</h1>
        </header>
        <input name="email" type="email" placeholder="your@mail.com" required autoComplete="off" />
        <input name="subject" type="text" placeholder="subject" required autoComplete="off" />
        <textarea name="message" required autoComplete="off" />
        <input name="submitButton" type="submit" value="Send!" />
      </S.ContactForm>
    </S.FormWrapper>
  </Html>
);

ContactForm.defaultProps = {
  position: [-200, 200, 0],
};

ContactForm.propTypes = {
  position: PropTypes.arrayOf(number),
};

export default ContactForm;
