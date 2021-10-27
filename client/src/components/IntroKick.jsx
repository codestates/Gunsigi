import React from 'react';
import '../styles/landing/introKick.scss';
import { kickContents } from '../assets/Main';

function IntroKick() {
  const handlerTextForGif = () => {};

  return (
    <div className="introKick">
      <div className="textBox">
        <h3>{kickContents[0].title}</h3>
        <p>{kickContents[0].desc}</p>
      </div>
      <div className="imageBox">
        <div className="frameBox">
          <div className="frame">
            <img className="app" alt="site demo" src="/images/test2.gif" />
            <img className="web" alt="site demo" src="/images/test_web.gif" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroKick;
