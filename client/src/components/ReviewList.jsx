import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/ReviewList.scss';
import Review from './Review';

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
  const [page, setPage] = useState([0, 5]);
  const [pageNums, setPageNums] = useState([]);
  const [pageButton, setPageButton] = useState([]);
  const [pageButtonClassChange, setPageButtonClassChange] = useState(
    new Array(5).fill(false),
  );

  //! 리뷰 요청
  useEffect(() => {
    axios({
      url: `/reviews/${productId}`,
      params: { order: sequence, size: 5, page: 1 },
    }).then((res) => {
      const { total, itemsCount } = res.data.pages;

      setReviews(res.data.items);
      setReviewsCount(itemsCount);

      const pageList = [];

      for (let i = 1; i <= total; i += 1) {
        pageList.push(i);
      }

      setPageNums(pageList);
      setPageButton(pageList.slice(0, 5));
      setPageButtonClassChange([true, false, false, false, false]);
    });
  }, []);

  //! 리뷰 필터링
  useEffect(() => {
    axios({
      url: `/reviews/${productId}`,
      params: {
        order: sequence,
        size: 5,
        page: 1,
      },
      loading: false,
    }).then((res) => {
      setReviews(res.data.items);
      setPageButton([1, 2, 3, 4, 5]);
    });
  }, [sequence]);

  useEffect(() => {
    const monthIdx = month.indexOf(true);
    axios({
      url: `/reviews/${productId}`,
      params: {
        order: sequence,
        size: 5,
        page: 1,
        filter: monthName[monthIdx],
      },
      loading: false,
    }).then((res) => {
      const { total } = res.data.pages;

      setReviews(res.data.items);

      const pageList = [];

      for (let i = 1; i <= total; i += 1) {
        pageList.push(i);
      }

      setPageNums(pageList);
      setPageButton(pageList.slice(0, 5));
      setPageButtonClassChange([true, false, false, false, false]);
    });
  }, [month]);

  //! state 변경
  const handleReviewFilter = (e, num) => {
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

  //! 리뷰 페이지 번호 변경
  const handlePageNumChange = (e, idx) => {
    const monthIdx = month.indexOf(true);
    const pageButtonColor = new Array(5).fill(false);
    pageButtonColor[idx] = true;
    setPageButtonClassChange(pageButtonColor);

    axios({
      url: `/reviews/${productId}`,
      params: {
        order: sequence,
        size: 5,
        page: e.target.innerText,
        filter: month[monthIdx],
      },
      loading: false,
    }).then((res) => setReviews(res.data.items));
  };

  //! 리뷰페이지 전체 번호 변경
  const handleAllChangePageNums = (num) => {
    setPageButton(pageNums.slice(page[0] + num, page[1] + num));
    setPage([page[0] + num, page[1] + num]);
    setPageButtonClassChange([true, false, false, false, false]);

    axios({
      url: `/reviews/${productId}`,
      params: { order: sequence, size: 5, page: page[0] + (num + 1) },
    }).then((res) => {
      setReviews(res.data.items);
    });
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
                onClick={(e) => handleReviewFilter(e)}
                className={
                  sequence === 'recent' ? 'color_change button' : 'color button'
                }
              >
                최신순
              </span>
              <span className="color_change">|</span>
              <span
                aria-hidden="true"
                onClick={(e) => handleReviewFilter(e)}
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
                handleReviewFilter(e, 0);
              }}
              className={month[0] ? 'ReviewList_month_change' : ''}
            >
              1개월 이하
            </span>
            <span
              aria-hidden="true"
              onClick={(e) => {
                handleReviewFilter(e, 1);
              }}
              className={month[1] ? 'ReviewList_month_change' : ''}
            >
              3개월 이상
            </span>
            <span
              aria-hidden="true"
              onClick={(e) => {
                handleReviewFilter(e, 2);
              }}
              className={month[2] ? 'ReviewList_month_change' : ''}
            >
              6개월 이상
            </span>
            <span
              aria-hidden="true"
              onClick={(e) => {
                handleReviewFilter(e, 3);
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

      {pageButton.length !== 0 && (
        <div className="ReviewList_pagenation">
          {pageButton[0] !== 1 ? (
            <button
              onClick={() => handleAllChangePageNums(-5)}
              type="button"
              className="arrow"
            >
              ←
            </button>
          ) : null}
          <div className="pagenation">
            {pageButton.map((nums, idx) => (
              <button
                className={
                  pageButtonClassChange[idx] ? 'button_change' : 'button'
                }
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                onClick={(e) => handlePageNumChange(e, idx)}
                type="button"
              >
                {nums}
              </button>
            ))}
          </div>
          {pageButton[pageButton.length - 1] !== pageNums.length && (
            <button
              onClick={() => handleAllChangePageNums(5)}
              type="button"
              className="arrow"
            >
              →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewList;
