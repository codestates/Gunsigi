/* eslint-disable */
import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setIsLogin } from '../actions/modalAction';
import NavChange from '../components/NavChange';
import ReviewList from '../components/ReviewList';
import Write from '../components/Write';
import ReviewModal from '../components/ReviewModal';
import '../styles/ProductDetail.scss';
import ProductDetailStar from '../components/ProductDeatailStar';
import { setProductList } from '../actions/searchAction';
import { kakaoLinkDelivery } from '../utils/KakaoLinkDelivery';

function ProductDetail({ match }) {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.searchReducer);
  const { productList } = searchState;
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
    score: 4,
    isBookmarked: false,
    chemistry: {
      good: ['비타민', '비타민C', '아미노산'],
      bad: ['칼슘', '항생제', '혈액응고억제제'],
    },
  });

  const [isBookmark, setIsBookmark] = useState(ProductInfo.isBookmarked);
  const loginState = useSelector((state) => state.userReducer);

  const productId = match.params.id;

  //! 제품 상세정보 요청
  useEffect(async () => {
    await axios({
      url: `/products/${productId}`,
      withCredentials: true,
      loading: false,
    }).then((res) => {
      const info = res.data.itemInfo;
      setProductInfo(info);
      setIsBookmark(info.isBookmarked);
    });
  }, [productId]);

  //! 북마크 기능
  const isBookmarkedHandler = async () => {
    if (!loginState.isLogin) {
      dispatch(setIsLogin(true));
    } else {
      if (!isBookmark) {
        await axios({
          method: 'POST',
          url: '/bookmarks',
          data: { productId },
          loading: false,
        }).then(() => {
          setIsBookmark(true);
          dispatch(
            setProductList(
              productList.map((product) => {
                if (product.id === parseInt(productId, 10))
                  product.isBookmarked = true;
                return product;
              }),
            ),
          );
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
          dispatch(
            setProductList(
              productList.map((product) => {
                if (product.id === parseInt(productId, 10))
                  product.isBookmarked = false;
                return product;
              }),
            ),
          );
        });
      }
    }
  };

  //! ReviewModal 창 키고 끄는 함수
  const openWriteHandler = (trueOrFalse) => {
    if (!loginState.isLogin) {
      dispatch(setIsLogin(true));
    } else {
      setisOpenWrite(trueOrFalse);
    }
  };

  return (
    <>
      {isOpenWrite ? (
        <ReviewModal
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
                  <button
                    onClick={() =>
                      kakaoLinkDelivery(
                        ProductInfo.name,
                        productId,
                        ProductInfo.image,
                      )
                    }
                    type="button"
                  >
                    <img src="/kakao_Logo.jpeg" alt="kakao" />
                  </button>
                </div>
                <div className="functional">{ProductInfo.functional}</div>
                <div className="stars">
                  <ProductDetailStar score={ProductInfo.score} />
                  <span className="score">{ProductInfo.score}</span>
                </div>
              </div>

              <div className="line" />

              <div className="ProductDetail_desc_bottom">
                {ProductInfo.chemistry.good.length === 0 &&
                ProductInfo.chemistry.bad.length === 0 ? null : (
                  <div className="ProductDetail_chemistry">
                    <span className="name">제품궁합</span>

                    <div>
                      {ProductInfo.chemistry.good.map((good, idx) => (
                        <span key={idx} className="good">
                          <img src="/icons/icon_thumbs.svg" alt="thums-up" />
                          <span>{good}</span>
                        </span>
                      ))}
                      {ProductInfo.chemistry.bad.map((bad, idx) => (
                        <span key={idx} className="bad">
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
        <ReviewList productId={productId} name={ProductInfo.name} />
      </div>
    </>
  );
}

export default memo(ProductDetail);
