import React from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/landing/introOne.scss';
import { categoryContents } from '../assets/Main';

function IntroOne() {
  const history = useHistory();

  const handleSearchCategory = (e) => {
    const category = e.target.value;
    history.push({
      pathname: '/search',
      search: `?query=${category}&type=category`,
    });
  };

  return (
    <div className="introOne">
      <div className="introOne_text">
        <h1>관심사별로 건강기능식품을 찾아보세요!</h1>
        <p>아래의 슬라이드를 통해 관심사별 건강기능식품 목록을 볼 수 있어요</p>
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
                <div className="text">
                  <h3>{el.title}</h3>
                  <p>{el.desc}</p>
                </div>
                <button
                  type="button"
                  className="goToSearch"
                  value={el.category}
                  onClick={handleSearchCategory}
                >
                  식품 목록 보기
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
