/* eslint-disable react/no-this-in-sfc */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IsLoadingSmall from './IsLoadingSmall';
import '../styles/ReviewList.scss';
import Review from './Review';

let page;
let total;
let lock = false;

function ReviewList({ name, productId }) {
  const [sequence, setSequence] = useState('recent');
  const [month, setMonth] = useState([false, false, false, false]);
  const [reviews, setReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [monthName] = useState([
    '1개월 이하',
    '3개월 이상',
    '6개월 이상',
    '1년 이상',
  ]);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getReviews = async (order, filter, more) => {
    // page 더 없으면 리턴
    if (page > total && more) {
      setIsLoaded(false);
      return;
    }

    const params = { order, filter, size: 5, page: more ? page + 1 : 1 };
    Object.keys(params).forEach((k) => {
      if (!params[k]) delete params[k];
    });

    const res = await axios.get(`/reviews/${productId}`, {
      params: { ...params },
      loading: false,
    });

    if (more) {
      if (res.data.items.length === 0) {
        page += Number.MAX_SAFE_INTEGER;
        setIsLoaded(false);
        return;
      }
      page += 1;
      setReviews((review) => review.concat(res.data.items));
      setReviewsCount(res.data.pages.total);
    } else {
      page = res.data.pages.page;
      setReviews(res.data.items);
      setReviewsCount(res.data.pages.itemsCount);
    }
    total = res.data.pages.total;
    if (page <= total) lock = false;
    setIsLoaded(false);
  };

  //! 필터링 요청 및 리뷰 요청
  useEffect(async () => {
    const monthIdx = month.indexOf(true);
    if (monthIdx !== -1) {
      await getReviews(sequence, monthName[monthIdx] || '');
    } else {
      await getReviews(sequence, '');
    }
  }, [sequence, month]);

  //! state 변경
  const reviewFilterHandler = (e, num) => {
    const monthIdx = month.indexOf(true);

    if (monthIdx === num) {
      const monthDummy = [false, false, false, false];
      monthDummy[num] = false;
      setMonth(monthDummy);
    }

    if (monthIdx !== num || monthIdx === -1) {
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

  //! 리뷰 더보기
  const getMoreItem = async () => {
    const monthIdx = month.indexOf(true);
    getReviews(sequence, monthIdx === -1 ? '' : monthName[monthIdx], true);
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
  }, [target, sequence, month]);

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
            {reviews.map((review, reviewIdx) => (
              <Review
                key={review.id}
                reviews={reviews}
                reviewIdx={reviewIdx}
                setReviews={setReviews}
                reviewId={review.id}
                name={name}
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
            <div id="observe" ref={setTarget}>
              {isLoaded && <IsLoadingSmall />}
            </div>
          </div>
        ) : (
          <div className="ReviewList_list_none">
            <div className="review_none">
              <img src="/icons/icon_warn.svg" alt="warn" />
              <span>리뷰가 존재하지 않습니다</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewList;
