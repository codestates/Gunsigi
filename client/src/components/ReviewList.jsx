import React from 'react';
import { ProductInfo } from '../assets/Search';
import '../styles/ReviewList.scss';
import Review from './Review';

function ReviewList() {
  return (
    <div className="ReviewList_container">
      <div className="ReviewList_in">
        <div className="ReviewList_write">
          <span>{`리뷰 (${ProductInfo.reviewsCount})`}</span>
          <button type="button">리뷰 작성하기</button>
        </div>
        <div className="ReviewList_list">
          {ProductInfo.reviews.map((review) => (
            <Review
              key={review.id}
              name={ProductInfo.name}
              profile={review.profileImage}
              nickname={review.nickname}
              productId={review.productId}
              content={review.content}
              date={review.date}
              score={review.score}
              isMine={review.isMine}
              images={review.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
