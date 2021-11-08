import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMyProducts, setMyProductsCnt } from '../actions/userAction';
import { setProductList } from '../actions/searchAction';
import { outMypage } from '../actions/inoutMypageAction';
import Product from './Product';
import IsLoadingSmall from './IsLoadingSmall';
import '../styles/Mypage/MyProducts.scss';

let total = 1;
let lock = false;

function MyProducts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.userReducer);
  const { myProducts, myProductsCnt } = userState;
  const searchState = useSelector((state) => state.searchReducer);
  const { productList } = searchState;
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNone, setIsNone] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => () => dispatch(setMyProducts([])), []);

  // * 내 북마크 요청 30개씩 페이지네이션
  useEffect(async () => {
    lock = true;
    if (page > total) {
      setIsLoaded(false);
      return;
    }
    axios
      .get('/bookmarks', { params: { page, size: 30 }, loading: false })
      .then((res) => {
        if (res.data.pages.itemCount === 0) {
          setIsNone(true);
          dispatch(setMyProductsCnt(res.data.pages.itemCount));
          return;
        }
        total = res.data.pages.total;
        dispatch(setMyProducts([...myProducts, ...res.data.items]));
        dispatch(setMyProductsCnt(res.data.pages.itemCount));
        if (page === total) {
          target.style.display = 'none';
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoaded(false);
        lock = false;
      });
  }, [page]);

  // * 마이페이지 내 북마크 삭제 요청
  // productId의 타입은 문자열이므로 숫자로 변환해야함
  const deleteBookmark = (productId) => {
    axios
      .delete('/bookmarks', { data: { productId }, loading: false })
      .then(() => {
        dispatch(
          setMyProducts(
            myProducts.filter(
              (MyProduct) => MyProduct.id !== parseInt(productId, 10),
            ),
          ),
        );
        dispatch(setMyProductsCnt(myProductsCnt - 1));
        dispatch(
          setProductList(
            productList.map((product) => {
              if (product.id === parseInt(productId, 10))
                product.isBookmarked = false;
              return product;
            }),
          ),
        );
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

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded && !lock) {
      lock = true;
      setIsLoaded(true);
      observer.unobserve(entry.target);
      setPage((prevPage) => prevPage + 1);
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
  }, [target]);

  return (
    <>
      {!isNone ? (
        <div className="my-products">
          {myProducts.map((item) => (
            <div
              className="product_wrapper"
              onClick={handleClickProduct}
              aria-hidden="true"
              key={`key ${item.id}`}
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
