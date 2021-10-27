import React from 'react';
import { ProductInfo } from '../assets/Search';
import ReviewList from '../components/ReviewList';
import '../styles/ProductDetail.scss';

function ProductDetail() {
  return (
    <div className="ProductDetail_container">
      <div className="ProductDetail_in">
        <div className="ProductDetail_img">
          <img
            className={
              ProductInfo.isBookmarked
                ? 'ProductDetail_icon_change heart'
                : 'ProductDetail_icon heart'
            }
            src="icons/heart_fill.svg"
            alt="하트"
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
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <img
                className={
                  ProductInfo.score >= 2
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <img
                className={
                  ProductInfo.score >= 3
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <img
                className={
                  ProductInfo.score >= 4
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <img
                className={
                  ProductInfo.score > 4
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <span>{ProductInfo.score}</span>
            </div>
          </div>
          <div className="line" />
          <div className="ProductDetail_desc_bottom">
            <div>
              <span>유통기한</span>
              <span>{ProductInfo.expiration}</span>
            </div>
            <div>
              <span>섭취방법</span>
              <span>{ProductInfo.hotToEat}</span>
            </div>
            <div>
              <span>제품형태</span>
              <span>{ProductInfo.shape}</span>
            </div>
            <div>
              <span>섭취시 주의사항</span>
              <span>{ProductInfo.warning}</span>
            </div>
            <div>
              <span>기준규격</span>
              <span>{ProductInfo.standard}</span>
            </div>
          </div>
        </div>
      </div>
      <ReviewList />
    </div>
  );
}

export default ProductDetail;
