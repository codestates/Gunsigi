/* eslint-disable */
import React from 'react';
import '../styles/Product.scss';

function Product({ name, heart, star, reviews, img }) {
  return (
    <div className="Product_container">
      <div className="Product_items">
        <div>
          <img src={img} alt={name} />
        </div>
        <div>
          <span>{name}</span>
          <img className="Product_heart" src={heart} alt="heart" />
        </div>
        <div>
          <span>
            <img className="Product_star" src={star} alt="star" />
            <img className="Product_star" src={star} alt="star" />
            <img className="Product_star" src={star} alt="star" />
            <img className="Product_star" src={star} alt="star" />
            <img className="Product_star" src={star} alt="star" />
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
