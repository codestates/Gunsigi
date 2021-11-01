import React, { useEffect, useState } from 'react';
// import { ProductInfo } from '../assets/Search';
import axios from 'axios';
import NavChange from '../components/NavChange';
import ReviewList from '../components/ReviewList';
import Write from '../components/Write';
import ReviewModal from '../components/ReviewModal';
import '../styles/ProductDetail.scss';
import Loading from '../components/Loading';

function ProductDetail({ match }) {
  const [isOpenWrite, setisOpenWrite] = useState(false);

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

  const productId = match.params.id;

  useEffect(async () => {
    await axios({
      url: `${process.env.REACT_APP_API_URL}/products/${productId}`,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        const info = res.data.itemInfo;
        setProductInfo(info);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const openWriteHandler = () => {
    setisOpenWrite(!isOpenWrite);
  };

  return (
    <>
      <div className="ProductDetail">
        <Write openReviewHandler={openWriteHandler} />
        <NavChange />

        <div className="ProductDetail_container">
          <div className="ProductDetail_in">
            <div className="ProductDetail_img">
              <img
                className={
                  ProductInfo.isBookmarked
                    ? 'ProductDetail_heart_change heart'
                    : 'ProductDetail_heart heart'
                }
                src="/icons/icon_bookmark.svg"
                alt="북마크"
              />
              <img src={ProductInfo.image} alt="약 이미지" />
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
                <div className="hotToeat">
                  <span className="name">섭취방법</span>
                  <span className="desc">{ProductInfo.hotToEat}</span>
                </div>
                <div className="shape">
                  <span className="name">제품형태</span>
                  <span className="desc">{ProductInfo.shape}</span>
                </div>
                <div className="warning">
                  <span className="name">섭취시 주의사항</span>
                  <span className="desc">{ProductInfo.warning}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReviewList
          // reviews={reviews}
          productId={productId}
          name={ProductInfo.name}
          reviewsCount={ProductInfo.reviewsCount}
        />
        {isOpenWrite && (
          <ReviewModal
            openWriteHandler={openWriteHandler}
            productImg={ProductInfo.image}
            productName={ProductInfo.name}
          />
        )}
      </div>
    </>
  );
}

export default ProductDetail;
