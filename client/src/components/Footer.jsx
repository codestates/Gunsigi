import React from 'react';
import '../styles/landing/footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="repository col-sm-1 col-md-1 col-lg-1">
            <p className="title">Our Repository</p>
            <a className="title" href="https://github.com/codestates/Gunsigi.git" target="_blank" rel="noreferrer">
              github.com/codestates/Gunsigi.git
            </a>
          </div>
          <div className="members col-sm-1 col-md-1 col-lg-2">
            <a className="github" href="https://github.com/Jin-suyeon" target="_blank" rel="noreferrer">
              <img alt="github" src="/icons/icon_github.svg" />
              <div className="member-name">Su Yeon</div>
            </a>
            <a className="github" href="https://github.com/sarahsea" target="_blank" rel="noreferrer">
              <img alt="github" src="/icons/icon_github.svg" />
              <div className="member-name">Seol A</div>
            </a>
            <a className="github" href="https://github.com/junghoonme" target="_blank" rel="noreferrer">
              <img alt="github" src="/icons/icon_github.svg" />
              <div className="member-name">Jung Hoon</div>
            </a>
            <a className="github" href="https://github.com/doldolma" target="_blank" rel="noreferrer">
              <img alt="github" src="/icons/icon_github.svg" />
              <div className="member-name">Do Young</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
