import React from 'react';
import '../styles/ReviewModal.scss';

function ReviewModal({ openWriteHandler, productImg, productName }) {
  return (
    <div
      className="modal_outside"
      onClick={openWriteHandler}
      aria-hidden="true"
    >
      <form
        className="modal_form"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <div className="review_top">
          <div className="review_title">
            <span>제품명</span>
            <span>{productName}</span>
          </div>
          <div className="product_star">
            <img className="product_img" src={productImg} alt="product" />
            <span className="rating-group">
              <input type="radio" id="star5" name="rating" value="5" />
              <label htmlFor="star5" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
              <input type="radio" id="star4" name="rating" value="4" />
              <label htmlFor="star4" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
              <input type="radio" id="star3" name="rating" value="3" />
              <label htmlFor="star3" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
              <input type="radio" id="star2" name="rating" value="2" />
              <label htmlFor="star2" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
              <input type="radio" id="star1" name="rating" value="1" />
              <label htmlFor="star1" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
            </span>
          </div>
        </div>
        <div className="period">
          <span>섭취 기간</span>
          <div>
            <label htmlFor="1month">
              <input id="1month" type="radio" name="period" />
              1개월 이하
            </label>
            <label htmlFor="3month">
              <input id="3month" type="radio" name="period" />
              3개월 이상
            </label>
            <label htmlFor="6month">
              <input id="6month" type="radio" name="period" />
              6개월 이상
            </label>
            <label htmlFor="year">
              <input id="year" type="radio" name="period" />
              1년 이상
            </label>
          </div>
        </div>
        <label htmlFor="review" className="review_text">
          <div>
            <span>리뷰</span>
            <span>200자 이내</span>
          </div>
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="10"
            maxLength="200"
            placeholder="허위사실 및 과장광고는 관리자에 의해 삭제될 수 있습니다."
          />
        </label>
        <div className="review_img">
          <span className="photo">사진</span>
          <div>
            <div className="loacal_img">
              <label htmlFor="img">
                <span>+</span>
                <input type="file" id="img" />
              </label>
            </div>
            <span className="review_notice">
              사진을 제외한 모든 항목을 입력해주세요
            </span>
          </div>
        </div>
        <div className="bottom">
          <button type="submit">작성 완료</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewModal;
