import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMyProducts, setMyProductsCnt } from '../actions/userAction';
import { outMypage } from '../actions/inoutMypageAction';
import Product from './Product';
import IsLoadingSmall from './IsLoadingSmall';
import '../styles/Mypage/MyProducts.scss';

function MyProducts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.userReducer);
  const { myProducts, myProductsCnt } = userState;

  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // * 처음 랜더링 될 때 내 북마크 요청
  useEffect(() => {
    axios
      .get('/bookmarks?page=1&size=30', { loading: false })
      .then((res) => {
        console.log('처음');
        // console.log(res.data.items);
        dispatch(setMyProducts(res.data.items));
        dispatch(setMyProductsCnt(res.data.pages.itemCount));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // * 마이페이지 내 북마크 삭제 요청
  // productId의 타입은 문자열이므로 숫자로 변환해야함
  const deleteBookmark = (productId) => {
    axios
      .delete('/bookmarks', { data: { productId }, loading: false })
      .then(() => {
        console.log('삭제');
        dispatch(
          setMyProducts(
            myProducts.filter(
              (MyProduct) => MyProduct.id !== parseInt(productId, 10),
            ),
          ),
        );
        dispatch(setMyProductsCnt(myProductsCnt - 1));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // * 내가 북마크한 제품 삭제 및 북마크한 제품 링크 연결 핸들러
  const handleClickProduct = (e) => {
    const bookmarkClass = e.target.className;
    const productId = e.currentTarget.id;

    if (bookmarkClass === 'Product_heart_change') {
      deleteBookmark(productId);
    } else {
      dispatch(outMypage());
      history.push(`/product-detail/${productId}`);
    }
  };

  let page = 1;
  let total = 1;
  let lock = false;

  // * 무한 스크롤 구현
  const getMoreItem = async () => {
    if (page > total) {
      setIsLoaded(false);
      return true;
    }

    const res = await axios({
      url: `/bookmarks?size=30&page=${page + 1}`,
      loading: false,
    });

    dispatch(setMyProducts(myProducts.concat(res.data.items)));
    console.log(res.data.items);
    console.log('무한으로 즐겨요');
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
    <>
      {myProducts.length !== 0 ? (
        <div className="my-products">
          {myProducts.map((item) => (
            <div
              className="product_wrapper"
              onClick={handleClickProduct}
              aria-hidden="true"
              key={item.id}
              id={item.id}
            >
              <Product
                name={item.name}
                reviews={item.reviewsCount}
                img={item.image}
                score={item.score}
                bookmark={item.isBookmarked}
              />
            </div>
          ))}
          <div ref={setTarget}>{isLoaded && <IsLoadingSmall />}</div>
        </div>
      ) : (
        <div className="myProducts_none">
          <img src="/icons/icon_warn.svg" alt="warn" />
          <span>북마크하신 제품이 존재하지 않습니다</span>
        </div>
      )}
    </>
  );
}

export default MyProducts;
