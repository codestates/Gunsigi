import React from 'react';
import '../styles/landing/Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="repository col-sm-1 col-md-1 col-lg-1">
            <p className="title">Our Repository</p>
            <a className="title" href="https://github.com/codestates/Gunsigi.git">
              github.com/codestates/Gunsigi.git
            </a>
          </div>
          <div className="members col-sm-1 col-md-1 col-lg-2">
            <a className="github" href="https://github.com/Jin-suyeon" target="_blank" rel="noreferrer">
              <img alt="github" src="/icons/icon_github.svg" />
              <div className="member-name">Su Yeon</div>
            </a>
            <a className="github" href="https://github.com/seola25" target="_blank" rel="noreferrer">
              <img alt="github" src="/icons/icon_github.svg" />
              <div className="member-name">Seol A</div>
            </a>
            <a className="github" href="https://github.com/hoony0802" target="_blank" rel="noreferrer">
              <img alt="github" src="/icons/icon_github.svg" />
              <div className="member-name">Jung Hoon</div>
            </a>
            <a className="github" href="https://github.com/iidd0101" target="_blank" rel="noreferrer">
              <img alt="github" src="/icons/icon_github.svg" />
              <div className="member-name">Do Yeong</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
