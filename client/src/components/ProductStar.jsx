import React from 'react';
import '../styles/ProductStar.scss';

function ProductStar({ score }) {
  return (
    <div className="Star_container">
      <div className="Star_yellow_half">
        <span>
          {score > 0 && score < 1 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="0.5" />
          ) : null}
        </span>
        <span>
          {score > 1 && score < 2 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="1.5" />
          ) : null}
        </span>
        <span>
          {score > 2 && score < 3 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="2.5" />
          ) : null}
        </span>
        <span>
          {score > 3 && score < 4 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="3.5" />
          ) : null}
        </span>
        <span>
          {score > 4 && score < 5 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="4.5" />
          ) : null}
        </span>
      </div>

      <div className="Star_yellow">
        <span>
          {score >= 1 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="1" />
          ) : null}
        </span>
        <span>
          {score >= 2 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="2" />
          ) : null}
        </span>
        <span>
          {score >= 3 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="3" />
          ) : null}
        </span>
        <span>
          {score >= 4 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="4" />
          ) : null}
        </span>
        <span>
          {score === 5 ? (
            <img src="/icons/icon_star_fill.svg" alt="star" name="5" />
          ) : null}
        </span>
      </div>

      <div className="Star_grey">
        <span>
          <img src="/icons/icon_star_fill.svg" alt="star" />
        </span>
        <span>
          <img src="/icons/icon_star_fill.svg" alt="star" />
        </span>
        <span>
          <img src="/icons/icon_star_fill.svg" alt="star" />
        </span>
        <span>
          <img src="/icons/icon_star_fill.svg" alt="star" />
        </span>
        <span>
          <img src="/icons/icon_star_fill.svg" alt="star" />
        </span>
      </div>
    </div>
  );
}

export default ProductStar;
