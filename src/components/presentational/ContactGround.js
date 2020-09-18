import React from 'react';
import { usePlane } from 'use-cannon';

const ContactGround = () => {
  const [ref] = usePlane(() => ({
    type: 'Static', rotation: [0, 0, 0], position: [0, 0, -10],
  }));

  return (
    <mesh ref={ref} />
  );
};

export default ContactGround;
