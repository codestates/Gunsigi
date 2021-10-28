import React, { useState } from 'react';
import '../styles/Review.scss';
import DeleteReviewModal from './DeleteReviewModal';

function Review({
  name,
  profile,
  nickname,
  productId,
  content,
  date,
  score,
  isMine,
  images,
}) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const openDeleteHandler = () => {
    setIsOpenDelete(!isOpenDelete);
  };

  return (
    <>
      <div className="Reviews_container">
        <div className="Reviews_in">
          <div className="Reviews_left">
            {isMine ? (
              <img
                className="delete_left"
                src="icons/icon_bin.svg"
                alt="review_delete"
              />
            ) : null}
            <img className="profile" src={profile} alt="profile_img" />
            <div className="nameOrDate">
              <div className="nickname">{nickname}</div>
              <div className="date">{date}</div>
            </div>
            <div className="stars">
              <img
                className={
                  score >= 1
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <img
                className={
                  score >= 2
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <img
                className={
                  score >= 3
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <img
                className={
                  score >= 4
                    ? 'ProductDetail_icon_change'
                    : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
              <img
                className={
                  score > 4 ? 'ProductDetail_icon_change' : 'ProductDetail_icon'
                }
                src="icons/icon_star_fill.svg"
                alt="star"
              />
            </div>
          </div>
          <div className="Reviews_right">
            {isMine ? (
              <img
                className="delete"
                src="icons/icon_bin.svg"
                alt="review_delete"
                onClick={openDeleteHandler}
                aria-hidden="true"
              />
            ) : null}
            <div className="name">
              <span>제품명</span>
              <span>{name}</span>
            </div>
            <div className="images">
              {images.map((image) => (
                <img src={image} alt="review_img" />
              ))}
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
