import React, { useEffect, useState } from 'react';
import Review from './Review';
import '../styles/Mypage/MyReviews.scss';

import IsLoadingSmall from './IsLoadingSmall';

function MyReviews({ reviews, setReviews, setTarget, isLoaded }) {
  return (
    <div className="my-reviews">
      {reviews.map((review, reviewIdx) => (
        <Review
          key={review.id}
          reviews={reviews}
          reviewIdx={reviewIdx}
          setReviews={setReviews}
          reviewId={review.id}
          name={review.productName}
          profile={review.userInfo.profileImage}
          nickname={review.userInfo.nickname}
          productId={review.productId}
          content={review.content}
          date={review.createdAt.slice(0, 10)}
          score={review.score}
          images={review.images}
          period={review.period}
        />
      ))}
      {/* <div ref={setTarget}>{<IsLoadingSmall />}</div> */}
      <div ref={setTarget}>{isLoaded && <IsLoadingSmall />}</div>
    </div>
  );
}

export default MyReviews;
