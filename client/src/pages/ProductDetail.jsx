/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-shorthand */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NavChange from '../components/NavChange';
import ReviewList from '../components/ReviewList';
import Write from '../components/Write';
import ReviewModal from '../components/ReviewModal';
import '../styles/ProductDetail.scss';
import IsLogin from '../components/IsLogin';

function ProductDetail({ match }) {
  const [isOpenWrite, setisOpenWrite] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userId: 1,
      productId: 1,
      content: '약빨 너무 좋아요!!!! 최고',
      score: 4,
      likesCount: 2,
      period: '1개월 이하',
      createdAt: '2021-10-29T12:33:31.000Z',
      updatedAt: '2021-10-29T12:33:31.000Z',
      images: [],
      userInfo: {
        profileImage: '',
        id: 1,
        nickname: 'doldolma',
      },
    },
  ]);
  const [ProductInfo, setProductInfo] = useState({
    id: 0,
    name: '정관장',
    company: '고려인삼공사',
    image: '',
    validNumber: '123123',
    functional:
      '가르시니아캄보지아 추출물 : 탄수화물이 지방으로 합성되는 것을 억제하여 체지방 감소에 도움을 줄 수 있음\n\n비타민C : ① 결합조직 형성과 기능유지에 필요 ② 철의 흡수에 필요 ③ 항산화 작용을 하여 유해산소로부터 세포를 보호하는데 필요',
    expiration: '제조일로부터 24개월까지',
    hotToEat: '1일 2회, 1회 1포를 물 250mL에 타서 잘 흔들어 섭취한다.',
    shape: '분말',
    standard:
      '(1) 성상 : 이미, 이취가 없고 고유의 향미가 있는 노랑하양색의 분말 \n(2) 납 : 1.0 mg/kg\n(3) 카드뮴 : 0.5 mg/kg',
    warning:
      '(1) 어린이, 임산부 및 수유부는 섭취를 피하시기 바랍니다.\n(2) 간∙신장∙심장질환, 알레르기 및 천식이 있거나 의약품 복용 시 전문가와 상담하십시오.',
    bookmarksCount: 12,
    reviewsCount: 10,
    score: 4, // 반올림해서 소수점 x
    isBookmarked: true, // 유저가 북마크 했는지 여부
    chemistry: {
      good: ['비타민', '비타민C', '아미노산'],
      bad: ['칼슘', '항생제', '혈액응고억제제'],
    },
  });
  const [isBookmark, setIsBookmark] = useState(ProductInfo.isBookmarked);
  const loginState = useSelector((state) => state.userReducer);

  const productId = match.params.id;

  //! 새로고침시 제품정보 요청
  window.addEventListener('load', () => {
    axios({
      url: `/products/${productId}`,
      withCredentials: true,
    })
      .then((res) => {
        const info = res.data.itemInfo;
        setProductInfo(info);
        setIsBookmark(info.isBookmarked);
      })
      .catch((err) => console.log(err));
  });

  //! 제품 상세정보 요청, 리뷰요청
  useEffect(async () => {
    console.log('요청들어옴');
    await axios({
      url: `/products/${productId}`,
      withCredentials: true,
    })
      .then((res) => {
        const info = res.data.itemInfo;
        setProductInfo(info);
        setIsBookmark(info.isBookmarked);
      })
      .catch((err) => console.log(err));

    await axios({
      url: `${process.env.REACT_APP_API_URL}/reviews/${productId}`,
      withCredentials: true,
      // headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        setReviews(res.data.items);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  // //! 리뷰요청
  // useEffect(async () => {
  //   await
  // }, [productId]);

  //! 북마크 기능
  const isBookmarkedHandler = async () => {
    const isLoginModal = document.getElementById('IsLogin_container');

    if (!loginState.isLogin) {
      isLoginModal.style.right = '20px';
      setTimeout(() => {
        isLoginModal.style.right = '-250px';
      }, 1500);
    } else {
      if (!isBookmark) {
        await axios({
          method: 'POST',
          url: '/bookmarks',
          data: { productId },
          loading: false,
        }).then(() => {
          setIsBookmark(true);
        });
      }
      if (isBookmark) {
        await axios({
          method: 'DELETE',
          url: '/bookmarks',
          data: { productId },
          loading: false,
        }).then(() => {
          setIsBookmark(false);
        });
      }
    }
  };

  const openWriteHandler = (trueOrFalse) => {
    const isLoginModal = document.getElementById('IsLogin_container');

    if (!loginState.isLogin) {
      isLoginModal.style.right = '20px';
      setTimeout(() => {
        isLoginModal.style.right = '-250px';
      }, 1500);
    } else {
      setisOpenWrite(trueOrFalse);
    }
  };

  return (
    <>
      <IsLogin />
      {isOpenWrite ? (
        <ReviewModal
          setReviews={setReviews}
          productId={ProductInfo.id}
          setisOpenWrite={setisOpenWrite}
          productImg={ProductInfo.image}
          productName={ProductInfo.name}
        />
      ) : null}
      <Write openWriteHandler={openWriteHandler} />
      <div className="ProductDetail">
        <NavChange />

        <div className="ProductDetail_container">
          <div className="ProductDetail_in">
            <div className="ProductDetail_img">
              <img
                aria-hidden="true"
                onClick={() => isBookmarkedHandler()}
                className={
                  isBookmark
                    ? 'ProductDetail_heart_change heart'
                    : 'ProductDetail_heart heart'
                }
                src="/icons/icon_bookmark.svg"
                alt="북마크"
              />
              {ProductInfo.image ? (
                <img src={ProductInfo.image} alt="약 이미지" />
              ) : (
                <span>이미지를 준비중입니다</span>
              )}
            </div>

            <div className="ProductDetail_desc">
              <div className="ProductDetail_desc_top">
                <div className="company">{ProductInfo.company}</div>
                <div className="name">
                  <span>{ProductInfo.name}</span>
                  <span>{ProductInfo.validNumber}</span>
                </div>
                <div className="functional">{ProductInfo.functional}</div>
                <div className="stars">
                  <img
                    className={
                      ProductInfo.score >= 1
                        ? 'ProductDetail_star_change'
                        : 'ProductDetail_star'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <img
                    className={
                      ProductInfo.score >= 2
                        ? 'ProductDetail_star_change'
                        : 'ProductDetail_star'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <img
                    className={
                      ProductInfo.score >= 3
                        ? 'ProductDetail_star_change'
                        : 'ProductDetail_star'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <img
                    className={
                      ProductInfo.score >= 4
                        ? 'ProductDetail_star_change'
                        : 'ProductDetail_star'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <img
                    className={
                      ProductInfo.score === 5
                        ? 'ProductDetail_star_change'
                        : 'ProductDetail_star'
                    }
                    src="/icons/icon_star_fill.svg"
                    alt="star"
                  />
                  <span>{ProductInfo.score}</span>
                </div>
              </div>

              <div className="line" />

              <div className="ProductDetail_desc_bottom">
                {ProductInfo.chemistry.good.length === 0 &&
                ProductInfo.chemistry.bad.length === 0 ? null : (
                  <div className="ProductDetail_chemistry">
                    <span className="name">제품궁합</span>

                    <div>
                      {ProductInfo.chemistry.good.map((good) => (
                        <span className="good">
                          <img src="/icons/icon_thumbs.svg" alt="thums-up" />
                          <span>{good}</span>
                        </span>
                      ))}
                      {ProductInfo.chemistry.bad.map((bad) => (
                        <span className="bad">
                          <img src="/icons/icon_thumbs.svg" alt="thums-down" />
                          <span>{bad}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="expiration">
                  <span className="name">유통기한</span>
                  <span className="desc">{ProductInfo.expiration}</span>
                </div>
                {ProductInfo.hotToEat ? (
                  <div className="hotToeat">
                    <span className="name">섭취방법</span>
                    <span className="desc">{ProductInfo.hotToEat}</span>
                  </div>
                ) : null}
                {ProductInfo.shape ? (
                  <div className="shape">
                    <span className="name">제품형태</span>
                    <span className="desc">{ProductInfo.shape}</span>
                  </div>
                ) : null}
                {ProductInfo.warning ? (
                  <div className="warning">
                    <span className="name">섭취시 주의사항</span>
                    <span className="desc">{ProductInfo.warning}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <ReviewList
          reviews={reviews}
          productId={productId}
          name={ProductInfo.name}
          reviewsCount={ProductInfo.reviewsCount}
        />
      </div>
    </>
  );
}

export default ProductDetail;
