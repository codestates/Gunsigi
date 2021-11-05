import axios from 'axios';
import React, { useRef, useState } from 'react';
import '../styles/ReviewModal.scss';

function ReviewModal({ setisOpenWrite, productImg, productName, productId }) {
  const reviewModalEl = useRef(null);
  const [imgBase64, setImgBase64] = useState([]);
  const [reviewWrite, setReviewWrite] = useState({
    content: '',
    score: '',
    period: '',
  });

  const reviewWirteHandler = (e) => {
    const { value, name } = e.target;
    setReviewWrite({
      ...reviewWrite,
      [name]: value,
    });
  };

  //!이미지 업로드
  const reviewImageHandler = (e) => {
    setImgBase64([]);
    for (let i = 0; i < e.target.files.length; i += 1) {
      if (e.target.files[i]) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;

          if (base64) {
            //  images.push(base64.toString())
            const base64Sub = base64.toString();

            setImgBase64([...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
          }
        };
      }
    }
  };

  //! 이미지 삭제
  const deleteReviewImageHandler = (img) => {
    const idx = imgBase64.indexOf(img);
    const copyArr = [];
    for (let i = 0; i < imgBase64.length; i += 1) {
      if (i === idx) {
        continue;
      } else {
        copyArr.push(imgBase64[i]);
      }
    }
    setImgBase64(copyArr);
  };

  //! 리뷰요청
  const reviewRequest = () => {
    const notice = document.getElementById('review_notice');
    const { content, score, period } = reviewWrite;
    if (content.length === 0 || score.length === 0 || period.length === 0) {
      notice.style.opacity = '1';
    } else {
      axios({
        method: 'POST',
        data: {
          productId,
          content,
          score,
          period,
          images: imgBase64,
        },
        url: '/reviews',
      })
        .then(() => {
          setisOpenWrite(false);
          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const closeHandler = (e) => {
    if (e.target === reviewModalEl.current) {
      setisOpenWrite(false);
    }
  };

  return (
    <div
      className="modal_outside"
      onClick={(e) => closeHandler(e)}
      ref={reviewModalEl}
      aria-hidden="true"
    >
      <form
        className="modal_form"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <div className="review_top">
          <div className="review_title">
            <span>제품명</span>
            <span>{productName}</span>
          </div>
          <div className="product_star">
            {productImg ? (
              <img className="product_img" src={productImg} alt="product" />
            ) : (
              <span className="product_img_none">no Image</span>
            )}
            <span className="rating-group">
              <input
                onClick={(e) => reviewWirteHandler(e)}
                type="radio"
                id="star5"
                name="score"
                value="5"
              />
              <label htmlFor="star5" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
              <input
                onClick={(e) => reviewWirteHandler(e)}
                type="radio"
                id="star4"
                name="score"
                value="4"
              />
              <label htmlFor="star4" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
              <input
                onClick={(e) => reviewWirteHandler(e)}
                type="radio"
                id="star3"
                name="score"
                value="3"
              />
              <label htmlFor="star3" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
              <input
                onClick={(e) => reviewWirteHandler(e)}
                type="radio"
                id="star2"
                name="score"
                value="2"
              />
              <label htmlFor="star2" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
              <input
                onClick={(e) => reviewWirteHandler(e)}
                type="radio"
                id="star1"
                name="score"
                value="1"
              />
              <label htmlFor="star1" className="star">
                <img src="/icons/icon_star_fill.svg" alt="star" />
              </label>
            </span>
          </div>
        </div>
        <div className="period">
          <span>섭취 기간</span>
          <div>
            <label htmlFor="1month">
              <input
                onClick={(e) => reviewWirteHandler(e)}
                id="1month"
                type="radio"
                name="period"
                value="1개월 이하"
              />
              1개월 이하
            </label>
            <label htmlFor="3month">
              <input
                onClick={(e) => reviewWirteHandler(e)}
                id="3month"
                type="radio"
                name="period"
                value="3개월 이상"
              />
              3개월 이상
            </label>
            <label htmlFor="6month">
              <input
                onClick={(e) => reviewWirteHandler(e)}
                id="6month"
                type="radio"
                name="period"
                value="6개월 이상"
              />
              6개월 이상
            </label>
            <label htmlFor="year">
              <input
                onClick={(e) => reviewWirteHandler(e)}
                id="year"
                type="radio"
                name="period"
                value="1년 이상"
              />
              1년 이상
            </label>
          </div>
        </div>
        <label htmlFor="review" className="review_text">
          <div>
            <span>리뷰</span>
            <span>200자 이내</span>
          </div>
          <textarea
            onChange={(e) => reviewWirteHandler(e)}
            name="content"
            id="review"
            cols="30"
            rows="10"
            maxLength="200"
            placeholder="허위사실 및 과장광고는 관리자에 의해 삭제될 수 있습니다."
          />
        </label>
        <div className="review_img">
          <div className="photo">
            <span>사진</span>
            <span>4장 이내</span>
          </div>
          <div className="review_img_in">
            <div className="loacal_img">
              {imgBase64.length === 4 ? null : (
                <label htmlFor="img">
                  <span>+</span>
                  <input
                    onChange={(e) => {
                      reviewImageHandler(e);
                    }}
                    multiple="multiple"
                    name="images"
                    accept="image/*"
                    type="file"
                    id="img"
                  />
                </label>
              )}
              {imgBase64.map((img) => (
                <div
                  aria-hidden="true"
                  onClick={() => deleteReviewImageHandler(img)}
                  key={img}
                  className="imgBase64"
                >
                  <div>
                    <span>x</span>
                  </div>
                  <img src={img} alt="review_img" />
                </div>
              ))}
            </div>
            <span id="review_notice">
              사진을 제외한 모든 항목을 입력해주세요
            </span>
          </div>
        </div>
        <div className="bottom">
          <button onClick={() => reviewRequest()} type="button">
            작성 완료
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewModal;
