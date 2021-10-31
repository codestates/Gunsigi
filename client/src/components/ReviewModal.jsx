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
            <div>
              <span className="rating-group">
                <input
                  disabled
                  checked
                  className="rating__input rating__input--none"
                  name="rating3"
                  id="rating3-none"
                  value="0"
                  type="radio"
                />
                <label
                  aria-label="1 star"
                  className="rating__label"
                  htmlFor="rating3-1"
                >
                  <img
                    className="rating__icon rating__icon--star fa fa-star"
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-1"
                  value="1"
                  type="radio"
                />
                <label
                  aria-label="2 stars"
                  className="rating__label"
                  htmlFor="rating3-2"
                >
                  <img
                    className="rating__icon rating__icon--star fa fa-star"
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-2"
                  value="2"
                  type="radio"
                />
                <label
                  aria-label="3 stars"
                  className="rating__label"
                  htmlFor="rating3-3"
                >
                  <img
                    className="rating__icon rating__icon--star fa fa-star"
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-3"
                  value="3"
                  type="radio"
                />
                <label
                  aria-label="4 stars"
                  className="rating__label"
                  htmlFor="rating3-4"
                >
                  <img
                    className="rating__icon rating__icon--star fa fa-star"
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-4"
                  value="4"
                  type="radio"
                />
                <label
                  aria-label="5 stars"
                  className="rating__label"
                  for="rating3-5"
                >
                  <img
                    className="rating__icon rating__icon--star fa fa-star"
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-5"
                  value="5"
                  type="radio"
                />
              </span>
              <span>※ 별점은 더블 클릭 해주세요</span>
            </div>
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
