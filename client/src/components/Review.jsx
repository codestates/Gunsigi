import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Review.scss';
import DeleteReviewModal from './DeleteReviewModal';
import IsLogin from './IsLogin';

function Review({
  name,
  profile,
  nickname,
  content,
  date,
  score,
  images,
  period,
  reviewId,
  reviews,
  reviewIdx,
  setReviews,
  reviewProductId,
  setRieviewCount,
}) {
  const history = useHistory();
  const isOpenMypage = useSelector((state) => state.inoutMypage);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [reviewsLike, setReviewsLike] = useState([]);
  const [likeCount, setLikeCount] = useState([]);
  const loginState = useSelector((state) => state.userReducer);

  //! 리뷰삭제 모달창 열고닫는 기능 및 리뷰삭제 기능
  const openDeleteHandler = (trueOrFalse) => {
    console.log('리뷰');
    setIsOpenDelete(trueOrFalse);
    if (trueOrFalse === 'delete') {
      axios({
        method: 'DELETE',
        url: '/reviews',
        data: { reviewId },
      }).then(() => {
        axios({
          url: '/reviews?page=1&size=5',
        }).then((res) => {
          setReviews(res.data.items);
          setRieviewCount(res.data.pages.itemsCount);
        });
        setIsOpenDelete(false);
      });
    }
  };

  //! 리뷰 하트 요청
  const reviewLikeRequest = (e) => {
    if (loginState.isLogin) {
      setReviewsLike(
        reviewsLike.map((el, idx) => (reviewIdx === idx ? !el : el)),
      );
      if (e.target.className === 'heart_icon_change') {
        axios({
          method: 'DELETE',
          url: '/review/like',
          data: { reviewId },
          loading: false,
        }).then(() => {
          setLikeCount(
            likeCount.map((el, idx) => (reviewIdx === idx ? el - 1 : null)),
          );
        });
      }
      if (e.target.className === 'heart_icon') {
        axios({
          method: 'POST',
          url: '/review/like',
          data: { reviewId },
          loading: false,
        }).then(() => {
          setLikeCount(
            likeCount.map((el, idx) => (reviewIdx === idx ? el + 1 : null)),
          );
        });
      }
    } else {
      const isLoginModal = document.getElementById('IsLogin_container');
      isLoginModal.style.right = '20px';
      setTimeout(() => {
        isLoginModal.style.right = '-250px';
      }, 1500);
    }
  };

  useEffect(() => {
    const reviewLikeCount = [];
    const reviewHeart = [];

    for (let i = 0; i < reviews.length; i += 1) {
      reviewLikeCount.push(reviews[i].likesCount);
      reviewHeart.push(reviews[i].isLike);
    }
    setLikeCount(reviewLikeCount);
    setReviewsLike(reviewHeart);
  }, [reviews]);

  return (
    <>
      <IsLogin />
      <div className="Reviews_container">
        <div className="Reviews_in">
          <div className="Reviews_trashOrHeart">
            <div className="like">
              <img
                aria-hidden="true"
                onClick={(e) => reviewLikeRequest(e)}
                className={
                  reviewsLike[reviewIdx] ? 'heart_icon_change' : 'heart_icon'
                }
                src="/icons/heart_fill.svg"
                alt="heart"
              />
              <span>{likeCount[reviewIdx]}</span>
            </div>
            {isOpenMypage ? (
              <img
                className="delete"
                src="/icons/icon_bin.svg"
                alt="review_delete"
                onClick={() => openDeleteHandler(true)}
                aria-hidden="true"
              />
            ) : null}
          </div>

          <div className="Reviews_left">
            <div className="Reviews_Profile_info">
              {profile ? (
                <img className="profile" src={profile} alt="profile_img" />
              ) : (
                <img
                  className="profile"
                  src="/images/profile-min.jpg"
                  alt="profile_img"
                />
              )}
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
              {isOpenMypage ? (
                <div
                  aria-hidden="true"
                  onClick={() =>
                    history.push(`/product-detail/${reviewProductId}`)
                  }
                  className="product_name cursor"
                >
                  <span>제품명</span>
                  <span>{name}</span>
                </div>
              ) : (
                <div className="product_name">
                  <span>제품명</span>
                  <span>{name}</span>
                </div>
              )}
              <div className="period">
                <img src="/icons/icon_take_period.svg" alt="period" />
                <span>{period}</span>
              </div>
            </div>
            <div className="images">
              {images.map((image, idx) =>
                image ? <img key={idx} src={image} alt="review_img" /> : null,
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
