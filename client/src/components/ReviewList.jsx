import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { reviews } from '../assets/Search';
import '../styles/ReviewList.scss';
import Review from './Review';

function ReviewList({ name, reviewsCount, productId, reviews }) {
  const [sequence, setSequence] = useState(true);

  return (
    <div className="ReviewList_container">
      <div className="ReviewList_in">
        <div className="ReviewList_write">
          <div className="ReviewList_title">
            <div>{`리뷰 (${reviewsCount})`}</div>
            <div className="sequence">
              <span
                className={sequence ? 'color button' : 'color_change button'}
              >
                최신순
              </span>
              <span className="color_change">|</span>
              <span
                className={sequence ? 'color_change button' : 'color button'}
              >
                좋아요순
              </span>
            </div>
          </div>
          <div className="ReviewList_tag">
            <span>1개월 이하</span>
            <span>3개월 이상</span>
            <span>6개월 이상</span>
            <span>1년 이상</span>
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default ReviewList;
