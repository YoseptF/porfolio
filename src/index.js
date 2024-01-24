import './index.css';
import 'animate.css';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(

  <React.StrictMode>
    <div
      style={{
        background: '#2c2b2b',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        placeItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        className="animate__animated animate__infinite animate__bounce"
        src="/cards/call.png"
        alt="logo"
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
