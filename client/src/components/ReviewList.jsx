/* eslint-disable react/no-this-in-sfc */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IsLoadingSmall from './IsLoadingSmall';
import '../styles/ReviewList.scss';
import Review from './Review';

let page;
let total;
let lock = false;

function ReviewList({
  // setReviewPage,
  // reviewPage,
  name,
  // reviewsCount,
  // reviews,
  productId,
  // setReviews,
}) {
  const [sequence, setSequence] = useState('recent');
  const [month, setMonth] = useState([false, false, false, false]);
  const [reviews, setReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [pages, setPages] = useState({ page: 1, total: 1 });
  const [monthName] = useState([
    '1개월 이하',
    '3개월 이상',
    '6개월 이상',
    '1년 이상',
  ]);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getReviews = async (order, filter, more) => {
    console.log('page, total', page, total);
    // page 더 없으면 리턴
    if ((page > total) && more) {
      setIsLoaded(false);
      return;
    };
    
    const params = { order, filter, size: 5, page: more ? page + 1 : 1 };
    Object.keys(params).forEach((k) => {
      if(!params[k]) delete params[k]
    })
    console.log('params : ', params, more);
    const res = await axios.get(`/reviews/${productId}`, { params: { ...params }, loading: false });
    
    if (more) {
      if (res.data.items.length === 0) {
        page += 100;
        setIsLoaded(false);
        return;
      }
      page += 1;
      setReviews((review) => review.concat(res.data.items));
    }
    else {
      page = res.data.pages.page;
      setReviews(res.data.items);
    }
    total = res.data.pages.total;
    lock = false;
  }

  //! 필터링 요청
  useEffect(async () => {
    const monthIdx = month.indexOf(true);
    // setReviews([]);
    // const targetDiv = document.getElementById('observer');
    // if(targetDiv){
    //   console.log(targetDiv.style.po);
    //   targetDiv.innerHTML='asdasd123123';
    // }
    if (monthIdx !== -1) {
      await getReviews(sequence, monthName[monthIdx] || '');
      // await axios({
      //   url: `/reviews/${productId}?order=${sequence}&filter=${monthName[monthIdx]}&size=5`,
      //   loading: false,
      // }).then((res) => {
      //   setReviews(res.data.items);
      //   page = res.data.pages.page;
      //   total = res.data.pages.total;
      //   setReviewsCount(res.data.pages.itemsCount);
      //   console.log('reviewCount', res.data.pages.itemsCount);
      // });
    } else {
        await getReviews(sequence, '');
    //   await axios({
    //     url: `/reviews/${productId}?order=${sequence}&size=5`,
    //     loading: false,
    //   }).then((res) => {
    //     setReviews(res.data.items);
    //     page = res.data.pages.page;
    //     total = res.data.pages.total;
    //     setReviewsCount(res.data.pages.itemsCount);
    //     console.log('reviewCount', res.data.pages.itemsCount);
    //   });
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
    // console.log(sequence, monthName[monthIdx]);
    const monthIdx = month.indexOf(true);
    getReviews(sequence, monthIdx === -1 ? '' : monthName[monthIdx], true);
    // console.log('getmore page total', page, total)
    // if (page > total) {
    //   setIsLoaded(false);
    //   return true;
    // }
    // if (reviews.length === reviewsCount) return;
    // const res = await axios({
    //   url: `/reviews/${productId}?size=5&page=${page + 1}`,
    //   loading: false,
    // });
    // setReviews((review) => review.concat(res.data.items));
    // page += 1;
    // total = res.data.pages.total;
    // setIsLoaded(false);
    // lock = false;
    // return false;
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded && !lock) {
      lock = true;
      setIsLoaded(true);
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
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
                // ref={reviewIdx + 1 === reviews.length ? { setTarget } : null}
              />
            ))}
            <div id="observer" ref={setTarget}>{isLoaded && <IsLoadingSmall />}>zz</div>
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
