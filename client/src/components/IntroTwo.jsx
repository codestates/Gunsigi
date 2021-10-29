import React from 'react';
import '../styles/landing/IntroTwo.scss';

function IntroTwo() {
  return (
    <div className="introTwo">
      <div className="container">
        <div className="row">
          <div className="col-sm-1 col-md-1 col-lg-1 text-area">
            <h2>
              어떤 건강기능식품을
              <br />
              찾고 계시나요?
            </h2>
            <p>
              건식이가 대표 건강기능식품을 모아서
              <br />
              여러분에게 제공해드립니다
              <br />
              클릭하시는 순간 한눈에 여러분이 찾고계시는
              <br />
              건강기능식품을 보실 수 있습니다
            </p>
          </div>
          <div className="col-sm-1 col-md-1 col-lg-1">
            <div className="category">
              <img src="/images/best_vitamin.png" alt="vitamin" />
              <p className="text">비타민</p>
            </div>
          </div>
          <div className="col-sm-1 col-md-1 col-lg-1">
            <div className="category">
              <img src="/images/best_propolis.png" alt="propolis" />
              <p className="text">프로폴리스</p>
            </div>
          </div>
          <div className="col-sm-1 col-md-1 col-lg-1">
            <div className="category">
              <img src="/images/best_folic.png" alt="folic acid" />
              <p className="text">엽산</p>
            </div>
          </div>
          <div className="col-sm-1 col-md-1 col-lg-1">
            <div className="category">
              <img src="/images/best_lactos.png" alt="lactos" />
              <p className="text">유산균</p>
            </div>
          </div>
          <div className="col-sm-1 col-md-1 col-lg-1">
            <div className="category">
              <img src="/images/best_lutein.png" alt="lutein" />
              <p className="text">루테인</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroTwo;
