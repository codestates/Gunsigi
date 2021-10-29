import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/landing/IntroOne.scss';
import categoryContents from '../assets/IntroOne';

function IntroOne() {
  return (
    <div className="introOne">
      <div className="introOne_text">
        <h1>관심사별로 건강기능식품을 찾아보세요!</h1>
        <p>
          아래의 슬라이드를 이용하면 여러가지 관심사별로 제품들을 제공해드려요
        </p>
      </div>
      <div className="slider">
        <Carousel
          showArrows
          showThumbs={false}
          showIndicators
          showStatus={false}
          infiniteLoop
          autoPlay
          transitionTime="600"
        >
          {categoryContents.map((el) => (
            <div className="scene" key={el.id}>
              <div className="textBox">
                <h3>{el.title}</h3>
                <p>{el.desc}</p>
                <button type="button" className="goToSearch">
                  상품 둘러보기
                </button>
              </div>
              <div className="imageBox">
                <img alt="immunity" src={el.src} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default IntroOne;
