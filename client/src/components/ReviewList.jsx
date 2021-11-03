import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { reviews } from '../assets/Search';
import '../styles/ReviewList.scss';
import Review from './Review';

function ReviewList({ name, reviewsCount, reviews, productId, setReviews }) {
  const [sequence, setSequence] = useState('recent');
  const [month, setMonth] = useState([false, false, false, false]);
  const [monthName] = useState([
    '1개월 이하',
    '3개월 이상',
    '6개월 이상',
    '1년 이상',
  ]);

  // event.preventDefault();
  // event.stopPropagation();

  //! 필터링 요청
  useEffect(async () => {
    const monthIdx = month.indexOf(true);
    if (monthIdx !== -1) {
      await axios({
        url: `/reviews/${productId}?order=${sequence}&filter=${monthName[monthIdx]}`,
        loading: false,
      }).then((res) => {
        setReviews(res.data.items);
      });
    } else {
      await axios({
        url: `/reviews/${productId}?order=${sequence}`,
        loading: false,
      }).then((res) => {
        setReviews(res.data.items);
      });
    }
  }, [sequence]);

  useEffect(async () => {
    const monthIdx = month.indexOf(true);
    await axios({
      url: `/reviews/${productId}?order=${sequence}&filter=${monthName[monthIdx]}`,
      loading: false,
    }).then((res) => {
      setReviews(res.data.items);
    });
  }, [month]);

  //!state 변경
  const reviewFilterHandler = (e, num) => {
    if (num >= 0) {
      const monthDummy = [false, false, false, false];
      monthDummy[num] = true;
      setMonth(monthDummy);
    }
    if (e.target.innerText === '최신순') {
      setSequence('recent');
    }
    if (e.target.innerText === '좋아요순') {
      setSequence('like');
    }
  };

  return (
    <div className="ReviewList_container">
      <div className="ReviewList_in">
        <div className="ReviewList_write">
          <div className="ReviewList_title">
            <div>{`리뷰 (${reviewsCount})`}</div>
            <div className="sequence">
              <span
                aria-hidden="true"
                onClick={(e) => reviewFilterHandler(e)}
                className={
                  sequence === 'recent' ? 'color_change button' : 'color button'
                }
              >
                최신순
              </span>
              <span className="color_change">|</span>
              <span
                aria-hidden="true"
                onClick={(e) => reviewFilterHandler(e)}
                className={
                  sequence === 'like' ? 'color_change button' : 'color button'
                }
              >
                좋아요순
              </span>
            </div>
          </div>
          <div className="ReviewList_tag">
            <span
              aria-hidden="true"
              onClick={(e) => {
                reviewFilterHandler(e, 0);
              }}
              className={month[0] ? 'ReviewList_month_change' : ''}
            >
              1개월 이하
            </span>
            <span
              aria-hidden="true"
              onClick={(e) => {
                reviewFilterHandler(e, 1);
              }}
              className={month[1] ? 'ReviewList_month_change' : ''}
            >
              3개월 이상
            </span>
            <span
              aria-hidden="true"
              onClick={(e) => {
                reviewFilterHandler(e, 2);
              }}
              className={month[2] ? 'ReviewList_month_change' : ''}
            >
              6개월 이상
            </span>
            <span
              aria-hidden="true"
              onClick={(e) => {
                reviewFilterHandler(e, 3);
              }}
              className={month[3] ? 'ReviewList_month_change' : ''}
            >
              1년 이상
            </span>
          </div>
        </div>
        {reviews.length !== 0 ? (
          <div className="ReviewList_list">
            {reviews.map((review) => (
              <Review
                key={review.id}
                name={name}
                profile={review.userInfo.profileImage}
                nickname={review.userInfo.nickname}
                productId={review.productId}
                content={review.content}
                date={review.updatedAt.slice(0, 10)}
                score={review.score}
                images={review.images}
                isLike={review.isLike}
                likesCount={review.likesCount}
                period={review.period}
              />
            ))}
          </div>
        ) : (
          <div className="ReviewList_list">
            <div className="review_none">리뷰가 존재하지 않습니다</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewList;
