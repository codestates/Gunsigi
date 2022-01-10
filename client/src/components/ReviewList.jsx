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

  //! sequence state 변경 및 요청
  const handleSequenceFilter = (text) => {
    setSequence(text);
    const monthIdx = month.indexOf(true);

    axios({
      url: `/reviews/${productId}`,
      params: {
        filter: monthName[monthIdx],
        order: text,
        size: 5,
        page: 1,
      },
      loading: false,
    }).then((res) => {
      setReviews(res.data.items);
      const itemsLength = res.data.pages.total;
      const pagenation = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= itemsLength; i++) {
        pagenation.push(i);
      }
      setPageNums(pagenation);
      setPageButton(pagenation.slice(0, 5));
    });
  };

  //! month state 변경 및 요청
  const handleMonthFilter = (e, num) => {
    const monthIdx = month.indexOf(true);

    if (monthIdx === num) {
      const monthDummy = [false, false, false, false];
      monthDummy[num] = false;
      // eslint-disable-next-line no-param-reassign
      num = '';
      setMonth(monthDummy);
    }

    if (monthIdx !== num || monthIdx === -1) {
      const monthDummy = [false, false, false, false];
      monthDummy[num] = true;
      // eslint-disable-next-line no-param-reassign
      num = monthName[num];
      setMonth(monthDummy);
    }

    axios({
      url: `/reviews/${productId}`,
      params: {
        order: sequence,
        filter: num,
        size: 5,
        page: 1,
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
        filter: monthName[monthIdx],
      },
      loading: false,
    }).then((res) => {
      setReviews(res.data.items);
      window.scrollTo({ top: 500 });
    });
  };

  //! 리뷰페이지 전체 번호 변경
  const handleAllChangePageNums = (num) => {
    setPageButton(pageNums.slice(page[0] + num, page[1] + num));
    setPage([page[0] + num, page[1] + num]);
    setPageButtonClassChange([true, false, false, false, false]);

    axios({
      url: `/reviews/${productId}`,
      params: { order: sequence, size: 5, page: page[0] + (num + 1) },
      loading: false,
    }).then((res) => {
      setReviews(res.data.items);
      window.scrollTo({ top: 500 });
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
                onClick={() => handleSequenceFilter('recent')}
                className={
                  sequence === 'recent' ? 'color_change button' : 'color button'
                }
              >
                최신순
              </span>
              <span className="color_change">|</span>
              <span
                aria-hidden="true"
                onClick={() => handleSequenceFilter('like')}
                className={
                  sequence === 'like' ? 'color_change button' : 'color button'
                }
              >
                좋아요순
              </span>
            </div>
          </div>
          <div className="ReviewList_tag">
            {monthName.map((el, idx) => (
              <span
                aria-hidden="true"
                onClick={(e) => {
                  handleMonthFilter(e, idx);
                }}
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className={month[idx] ? 'ReviewList_month_change' : ''}
              >
                {el}
              </span>
            ))}
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
          <img
            onClick={() => handleAllChangePageNums(-5)}
            aria-hidden="true"
            className={
              pageButton[0] !== 1 ? 'arrowButton' : 'arrowButton_change'
            }
            src="/icons/icon_arrow_left.svg"
            alt="arrow"
          />

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

          <img
            onClick={() => handleAllChangePageNums(5)}
            aria-hidden="true"
            className={
              pageButton[pageButton.length - 1] !== pageNums.length
                ? 'arrowButton'
                : 'arrowButton_change'
            }
            src="/icons/icon_arrow_right.svg"
            alt="arrow"
          />
        </div>
      )}
    </div>
  );
}

export default ReviewList;
