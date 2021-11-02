import React from 'react';
import '../styles/Product.scss';

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
        <img
          className={bookmark ? 'Product_heart_change' : 'Product_heart'}
          src="/icons/icon_bookmark.svg"
          alt="heart"
        />
      </div>
      <div className="stars">
        <span>
          <img
            className={score >= 1 ? 'Product_icon_change' : 'Product_icon'}
            src="/icons/icon_star_fill.svg"
            alt="star"
          />
          <img
            className={score >= 2 ? 'Product_icon_change' : 'Product_icon'}
            src="/icons/icon_star_fill.svg"
            alt="star"
          />
          <img
            className={score >= 3 ? 'Product_icon_change' : 'Product_icon'}
            src="/icons/icon_star_fill.svg"
            alt="star"
          />
          <img
            className={score >= 4 ? 'Product_icon_change' : 'Product_icon'}
            src="/icons/icon_star_fill.svg"
            alt="star"
          />
          <img
            className={score >= 5 ? 'Product_icon_change' : 'Product_icon'}
            src="/icons/icon_star_fill.svg"
            alt="star"
          />
        </span>
        <span>{`(${reviews})`}</span>
      </div>
    </div>
  );
}

export default Product;
