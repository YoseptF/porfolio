import React from 'react';
import Card from '../presentational/Card';
import ContactForm from '../presentational/ContactForm';
import Keyboard from '../presentational/Keyboard';

const Contact = () => (
  <>
    <Keyboard position={[-250, 230, 0]} />
    <Card texture="call" size={[20, 20, 0]} position={[-150, 230, 0]} />
    <ContactForm position={[-200, 200, 0]} />
    <Card texture="cool" size={[20, 20, 0]} position={[-150, 165, 0]} />
    <Card texture="coffe" size={[20, 20, 0]} position={[-250, 180, 0]} />
  </>
);

export default Contact;
