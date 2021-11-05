import React from 'react';
import '../styles/Loading.scss';

function Loading() {
  return (
    <div className="loading">
      <div className="gunsigi_logo">
        <img alt="logo" src="/logo_g.png" className="g bounce" />
        <img alt="logo" src="/images/unsigi.png" className="unsigi" />
      </div>
    </div>
  );
}

export default Loading;
