import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Review from './Review';
import '../styles/Mypage/MyReviews.scss';

import IsLoadingSmall from './IsLoadingSmall';

function MyReviews({ reviews, setReviews }) {
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let page = 1;
  let total = 1;
  let lock = false;

  //! 리뷰 더보기
  const getMoreItem = async () => {
    if (page > total) {
      setIsLoaded(false);
      return true;
    }

    const res = await axios({
      url: `/reviews?size=5&page=${page + 1}`,
      loading: false,
    });
    setReviews((review) => review.concat(res.data.items));
    page += 1;
    total = res.data.pages.total;
    setIsLoaded(false);
    lock = false;
    return false;
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded && !lock) {
      lock = true;
      setIsLoaded(true);
      observer.unobserve(entry.target);
      const result = await getMoreItem();
      if (!result) observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

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
