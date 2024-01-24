import './index.css';
import 'animate.css';

import React from 'react';
import ReactDOM from 'react-dom';

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const visitorData = {
      // Basic Browser and Device Info
      browser: navigator.userAgent,
      deviceType: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      browserLanguage: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      // Location and Referral Info
      location: window.location.href,
      referrer: document.referrer,
      ip: data.ip,

      // Advanced Browser Features
      cookiesEnabled: navigator.cookieEnabled,
      javaEnabled: navigator.javaEnabled(),

      // Network Information (may require additional permissions/APIs)
      // networkInfo: navigator.connection, // Uncomment if network information is required

      // Date and Time of Visit
      visitDate: new Date().toLocaleString(),

      // Placeholder for Session Duration and Pages Visited
      // These would typically be calculated server-side or with a more complex client-side script
      // sessionDuration: 'Calculated server-side',
      // pagesVisited: 'Tracked via page view events',

      // Placeholder for Custom User Data (if applicable)
      // customUserData: 'User-specific data if logged in'
    };

    fetch('https://formspree.io/xvovpedq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Someone just saw your page!${JSON.stringify(visitorData)}`,
      }),
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
