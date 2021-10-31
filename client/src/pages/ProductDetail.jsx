import React, { useState } from 'react';
import { ProductInfo } from '../assets/Search';
import NavChange from '../components/NavChange';
import ReviewList from '../components/ReviewList';
import Write from '../components/Write';
import ReviewModal from '../components/ReviewModal';
import '../styles/ProductDetail.scss';

function ProductDetail() {
  const [isOpenWrite, setisOpenWrite] = useState(false);

  const openWriteHandler = () => {
    setisOpenWrite(!isOpenWrite);
  };

  return (
    <div className="ProductDetail">
      <Write openReviewHandler={openWriteHandler} />
      <NavChange />

      <div className="ProductDetail_container">
        <div className="ProductDetail_in">
          <div className="ProductDetail_img">
            <img
              className={
                ProductInfo.isBookmarked
                  ? 'ProductDetail_heart_change heart'
                  : 'ProductDetail_heart heart'
              }
              src="icons/icon_bookmark.svg"
              alt="북마크"
            />
            <img src={ProductInfo.image} alt="약 이미지" />
          </div>

          <div className="ProductDetail_desc">
            <div className="ProductDetail_desc_top">
              <div className="company">{ProductInfo.company}</div>
              <div className="name">
                <span>{ProductInfo.name}</span>
                <span>{ProductInfo.validNumber}</span>
              </div>
              <div className="functional">{ProductInfo.functional}</div>
              <div className="stars">
                <img
                  className={
                    ProductInfo.score >= 1
                      ? 'ProductDetail_star_change'
                      : 'ProductDetail_star'
                  }
                  src="icons/icon_star_fill.svg"
                  alt="star"
                />
                <img
                  className={
                    ProductInfo.score >= 2
                      ? 'ProductDetail_star_change'
                      : 'ProductDetail_star'
                  }
                  src="icons/icon_star_fill.svg"
                  alt="star"
                />
                <img
                  className={
                    ProductInfo.score >= 3
                      ? 'ProductDetail_star_change'
                      : 'ProductDetail_star'
                  }
                  src="icons/icon_star_fill.svg"
                  alt="star"
                />
                <img
                  className={
                    ProductInfo.score >= 4
                      ? 'ProductDetail_star_change'
                      : 'ProductDetail_star'
                  }
                  src="icons/icon_star_fill.svg"
                  alt="star"
                />
                <img
                  className={
                    ProductInfo.score === 5
                      ? 'ProductDetail_star_change'
                      : 'ProductDetail_star'
                  }
                  src="icons/icon_star_fill.svg"
                  alt="star"
                />
                <span>{ProductInfo.score}</span>
              </div>
            </div>

            <div className="line" />

            <div className="ProductDetail_desc_bottom">
              <div className="ProductDetail_chemistry">
                <span className="name">제품궁합</span>
                <div>
                  {ProductInfo.chemistry.good.map((good) => (
                    <span className="good">
                      <img src="icons/icon_thumbs.svg" alt="thums-up" />
                      <span>{good}</span>
                    </span>
                  ))}
                  {ProductInfo.chemistry.bad.map((bad) => (
                    <span className="bad">
                      <img src="icons/icon_thumbs.svg" alt="thums-down" />
                      <span>{bad}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="expiration">
                <span className="name">유통기한</span>
                <span className="desc">{ProductInfo.expiration}</span>
              </div>
              <div className="hotToeat">
                <span className="name">섭취방법</span>
                <span className="desc">{ProductInfo.hotToEat}</span>
              </div>
              <div className="shape">
                <span className="name">제품형태</span>
                <span className="desc">{ProductInfo.shape}</span>
              </div>
              <div className="warning">
                <span className="name">섭취시 주의사항</span>
                <span className="desc">{ProductInfo.warning}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewList
        name={ProductInfo.name}
        reviewsCount={ProductInfo.reviewsCount}
      />
      {isOpenWrite && (
        <ReviewModal
          openWriteHandler={openWriteHandler}
          productImg={ProductInfo.image}
          productName={ProductInfo.name}
        />
      )}
    </div>
  );
}

export default ProductDetail;
