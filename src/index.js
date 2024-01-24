import './index.css';
import 'animate.css';

import React from 'react';
import ReactDOM from 'react-dom';

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    fetch('https://formspree.io/xvovpedq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `someone just saw your calendly!${JSON.stringify({
          browser: navigator.userAgent,
          location: window.location.href,
          referrer: document.referrer,
          // get ip
          ip: data.ip,
        })}`,

      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

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
