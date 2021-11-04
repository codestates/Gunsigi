import React from 'react';
import Review from './Review';
import '../styles/Mypage/MyReviews.scss';

function MyReviews() {
  return (
    <div className="my-reviews">
      {reviews.map((review, reviewIdx) => (
        <Review
          reviews={reviews}
          reviewIdx={reviewIdx}
          setReviews={setReviews}
          key={review.id}
          reviewId={review.id}
          name={name}
          profile={review.userInfo.profileImage}
          nickname={review.userInfo.nickname}
          productId={review.productId}
          content={review.content}
          date={review.updatedAt.slice(0, 10)}
          score={review.score}
          images={review.images}
          period={review.period}
        />
      ))}
    </div>
  );
}

export default MyReviews;
