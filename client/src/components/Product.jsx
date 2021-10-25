/* eslint-disable */
import React from 'react';
import '../styles/Product.scss';

function Product({ name, reviews, img, score, bookmark }) {
  return (
    <div className="Product_container">
      <div className="Product_items">
        <div>
          <img src={img} alt={name} />
        </div>
        <div>
          <span>{name}</span>
          <img
            className={bookmark ? 'Product_icon_change' : 'Product_icon'}
            src="icons/heart_fill.svg"
            alt="heart"
          />
        </div>
        <div>
          <span>
            <img
              className={score >= 1 ? 'Product_icon_change' : 'Product_icon'}
              src="icons/icon_star_fill.svg"
              alt="star"
            />
            <img
              className={score >= 2 ? 'Product_icon_change' : 'Product_icon'}
              src="icons/icon_star_fill.svg"
              alt="star"
            />
            <img
              className={score >= 3 ? 'Product_icon_change' : 'Product_icon'}
              src="icons/icon_star_fill.svg"
              alt="star"
            />
            <img
              className={score >= 4 ? 'Product_icon_change' : 'Product_icon'}
              src="icons/icon_star_fill.svg"
              alt="star"
            />
            <img
              className={score >= 5 ? 'Product_icon_change' : 'Product_icon'}
              src="icons/icon_star_fill.svg"
              alt="star"
            />
          </span>
          <div>
            <span>{`(${reviews})`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
