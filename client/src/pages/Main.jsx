import React from 'react';
import '../styles/landing/landing.scss';
import Nav from '../components/Nav';
import NavChange from '../components/NavChange';
import IntroOne from '../components/IntroOne';
import IntroTwo from '../components/IntroTwo';
import IntroThree from '../components/IntroThree';
import Footer from '../components/Footer';

function Main() {
  return (
    <div className="main">
      <section className="main_intro_zero">
        <div className="background">
          <Nav />
          <div className="main_intro_text">
            <h1>우리 삶을 건강하게!</h1>
            <h3>건강기능식품 이야기, ‘건식이’를 소개합니다</h3>
            <p>
              건강기능식품을 타입별, 종류별 다양한 조건으로 검색해보고
              <br />
              필요한 건강기능식품의 상세 정보도 확인해 보세요
              <br />
              사용자들의 생생한 리뷰와 사진도 살펴볼 수 있습니다
            </p>
          </div>
        </div>
      </section>
      <IntroOne />
      <IntroTwo />
      <IntroThree />
      <Footer />
    </div>
  );
}

export default Main;
