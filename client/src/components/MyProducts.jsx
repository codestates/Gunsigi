import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMyProducts } from '../actions/userAction';
import { outMypage } from '../actions/inoutMypageAction';
import Product from './Product';
import '../styles/Mypage/MyProducts.scss';

function MyProducts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.userReducer);
  const { myProducts } = userState;
  const [isDelete, setIsDelete] = useState(false);

  // * 처음 랜더링 될 때 내 북마크 요청
  useEffect(() => {
    axios
      .get('/bookmarks')
      .then((res) => {
        console.log(res.data.items);
        dispatch(setMyProducts(res.data.items));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //  * 내 북마크 삭제 후 데이터 요청
  useEffect(() => {
    axios
      .get('/bookmarks', { loading: false })
      .then((res) => {
        dispatch(setMyProducts(res.data.items));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDelete]);

  // * 마이페이지 내 북마크 삭제 요청
  const deleteBookmark = (productId) => {
    axios({
      method: 'DELETE',
      url: '/bookmarks',
      data: { productId },
      loading: false,
    })
      .then(() => {
        setIsDelete(false);
        dispatch(
          setMyProducts(
            myProducts.filter((MyProduct) => MyProduct.id !== productId),
          ),
        );
        setIsDelete(true);
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
                key={item.id}
                name={item.name}
                reviews={item.reviewsCount}
                img={item.image}
                score={item.score}
                bookmark={item.isBookmarked}
              />
            </div>
          ))}
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
