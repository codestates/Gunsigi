/* eslint-disable */
import React from 'react';
import '../styles/Product.scss';
import ProductStar from './ProductStar';

function Product({ name, reviews, img, score, bookmark }) {
  return (
    <div className="Product_items">
      <div className="Product_img">
        {img ? (
          <img src={img} alt={name} />
        ) : (
          <div className="img_none">이미지를 준비중입니다</div>
        )}
      </div>
      <div className="title">
        <span>{name}</span>
        <div className="bookmark">
          <img
            className={bookmark ? 'Product_heart_change' : 'Product_heart'}
            src="/icons/icon_bookmark.svg"
            alt="bookmark"
          />
        </div>
      </div>
      <div className="stars">
        <ProductStar score={score} />
        <span className="review">{`(${reviews})`}</span>
      </div>
    </div>
  );
}

export default Product;
