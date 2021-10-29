import React, { useState, useEffect } from 'react';
import '../styles/landing/Landing.scss';
import Nav from '../components/Nav';
import IntroOne from '../components/IntroOne';
import IntroTwo from '../components/IntroTwo';
import IntroThree from '../components/IntroThree';
import Footer from '../components/Footer';
import IntroKick from '../components/IntroKick';
import TopButton from '../components/TopButton';

function Main() {
  // 탑버튼 스크롤 관련
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollPositionHandler = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollPositionHandler);
    return () => {
      window.removeEventListener('scroll', scrollPositionHandler);
    };
  });
  // 스크롤 클래스 이벤트
  const isElementUnderBottom = (elem, triggerDiff) => {
    const { top } = elem.getBoundingClientRect();
    const { innerHeight } = window;
    return top > innerHeight + (triggerDiff || 0);
  };

  const handleScroll = () => {
    const elems = document.querySelectorAll('.scroll');
    elems.forEach((elem) => {
      const el = elem;
      if (isElementUnderBottom(el, -20)) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
      } else {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0px)';
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // });

  return (
    <div className="main">
      {scrollPosition > 100 ? <TopButton /> : null}
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
      <IntroKick />
      <IntroOne />
      <IntroTwo />
      <IntroThree />
      <Footer />
    </div>
  );
}

export default Main;
