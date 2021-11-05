import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/landing/introOne.scss';
import {
  setSearchedProductList,
  setSearchType,
  setSearchedWord,
} from '../actions/searchAction';
import { categoryContents } from '../assets/Main';

function IntroOne() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearchCategory = (e) => {
    axios
      .get('/products', {
        params: {
          query: e.target.value,
          type: 'category',
        },
      })
      .then((res) => {
        const { items, pages } = res.data;
        dispatch(setSearchedWord(e.target.value));
        dispatch(setSearchedProductList(items, pages.itemCount));
        dispatch(setSearchType('category'));
        history.push('/search');
        window.scrollTo(0, 0);
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
