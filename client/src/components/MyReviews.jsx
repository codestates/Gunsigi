import React from 'react';
import { ProductInfo } from '../assets/Search';
import Review from './Review';
import '../styles/Mypage/MyReviews.scss';

function MyReviews() {
  return (
    <div className="my-reviews">
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
  );
}

export default MyReviews;
