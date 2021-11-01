import React, { useState } from 'react';
import '../styles/Review.scss';
import DeleteReviewModal from './DeleteReviewModal';

function Review({
  name,
  profile,
  nickname,
  // productId,
  content,
  date,
  score,
  // isMine,
  images,
  likesCount,
  isLike,
  period,
}) {
  const [isOpenMypage, setIsOpenMypage] = useState(true);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const openDeleteHandler = () => {
    setIsOpenDelete(!isOpenDelete);
  };

  return (
    <>
      <div className="Reviews_container">
        <div className="Reviews_in">
          <div className="Reviews_trashOrHeart">
            <div className="like">
              <img
                className={isLike ? 'heart_icon_change' : 'heart_icon'}
                src="/icons/heart_fill.svg"
                alt="heart"
              />
              <span>{likesCount}</span>
            </div>
            {isOpenMypage ? (
              <img
                className="delete"
                src="/icons/icon_bin.svg"
                alt="review_delete"
                onClick={openDeleteHandler}
                aria-hidden="true"
              />
            ) : null}
          </div>

          <div className="Reviews_left">
            <div className="Reviews_Profile_info">
              <img className="profile" src={profile} alt="profile_img" />
              <div className="nameOrDateOrstar">
                <div className="date">{date}</div>
                <div className="nickname">{nickname}</div>
                <div className="stars">
                  <img
                    className={
                      score >= 1
                        ? 'ProductDetail_icon_change'
                        : 'ProductDetail_icon'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <img
                    className={
                      score >= 2
                        ? 'ProductDetail_icon_change'
                        : 'ProductDetail_icon'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <img
                    className={
                      score >= 3
                        ? 'ProductDetail_icon_change'
                        : 'ProductDetail_icon'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <img
                    className={
                      score >= 4
                        ? 'ProductDetail_icon_change'
                        : 'ProductDetail_icon'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <img
                    className={
                      score > 4
                        ? 'ProductDetail_icon_change'
                        : 'ProductDetail_icon'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="Reviews_right">
            <div className="name">
              <div className="product_name">
                <span>제품명</span>
                <span>{name}</span>
              </div>
              <div className="period">
                <img src="/icons/icon_take_period.svg" alt="period" />
                <span>{period}</span>
              </div>
            </div>
            <div className="images">
              {images.map((image) =>
                image ? <img src={image} alt="review_img" /> : null,
              )}
            </div>
            <div className="content">{content}</div>
          </div>
        </div>
      </div>
      {isOpenDelete && (
        <DeleteReviewModal openDeleteHandler={openDeleteHandler} />
      )}
    </>
  );
}

export default Review;
