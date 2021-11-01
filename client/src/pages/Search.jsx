import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { outMypage } from '../actions/inoutMypageAction';
import { getProductList } from '../actions/searchAction';
// import { search } from '../assets/Search';
import NavChange from '../components/NavChange';
import Product from '../components/Product';
import '../styles/Search.scss';

function Search() {
  const dispactch = useDispatch();
  const [searchSequence, setSearchSequence] = useState(true);
  // const [productList, setProductList] = useState([]);
  // const [countProducts, setCountProducts] = useState(0);
  // const [searchedWord, setSearchedWord] = useState('');
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.searchReducer);
  const {
    productList,
    productCount,
    searchedProductList,
    searchedProductCount,
    searchedWord,
  } = searchState;
  // todo: 처음 전체 제품리스트를 받아온다 - 조회순 (조회순 class명 체인지)
  // todo: 인풋창에 검색을 하면 해당 인풋대로 서버에 요청 query=
  // todo: 리뷰순 클릭시, 리뷰순으로 재요청
  // todo: 100개 이후에는 무한 스크롤 구현 page,size
  // todo: 탑버튼 구현
  useEffect(() => {
    axios
      .get('/products/all/items', {
        params: { order: 'views' },
      })
      .then((res) => {
        const { items, pages } = res.data;
        dispatch(getProductList(items, pages.itemCount));
      })
      .catch((err) => console.log('전체제품조회 err----', err));
  }, []);

  // const handleSearchRequest = () => {
  //   console.log('search의 handleSearchRequest 실행')
  //   axios
  //     .get('/products', { params: { query: `${searchedWord}` } })
  //     .then((res) => {
  //       const { items, pages } = res.data;
  //       dispatch(searchedProductList(items, pages.itemCount));
  //     });
  // };
  // useEffect(() => {
  //   console.log('searchedWord 잘변경되나--', searchedWord);

  //     .catch((err) => console.log(err));
  // }, [products]);

  return (
    <>
      <NavChange />
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img" />
          <div className="Search_bottom">
            <div className="Search_title">
              <div>
                {!searchedWord ? '전체 건강기능식품' : '검색된 건강기능식품'}
                <span>
                  {!searchedWord
                    ? `(${productCount})`
                    : `(${searchedProductCount})`}
                </span>
              </div>
              <div className="Sequence">
                <span
                  className={searchSequence ? 'textColor_change' : 'textColor'}
                >
                  조회순
                </span>
                <span className="textColor_change">|</span>
                <span
                  className={searchSequence ? 'textColor' : 'textColor_change'}
                >
                  리뷰순
                </span>
              </div>
            </div>
            <div className="Search_products">
              {productList.map((item) => (
                <Link
                  to={`product-detail/${item.id}`}
                  onClick={() => dispactch(outMypage())}
                >
                  <Product
                    key={item.id}
                    name={item.name}
                    reviews={item.reviewsCount}
                    img={item.image}
                    score={item.score}
                    bookmark={item.isBookmarked}
                  />
                </Link>
              ))}

              {/* {!searchedWord
                ? productList.map((item) => (
                    <Link to={`product-detail/${item.id}`}>
                      <Product
                        key={item.id}
                        name={item.name}
                        reviews={item.reviewsCount}
                        img={item.image}
                        score={item.score}
                        bookmark={item.isBookmarked}
                      />
                    </Link>
                  ))
                : searchedProductList.map((item) => (
                    <Link to={`product-detail/${item.id}`}>
                      <Product
                        key={item.id}
                        name={item.name}
                        reviews={item.reviewsCount}
                        img={item.image}
                        score={item.score}
                        bookmark={item.isBookmarked}
                      />
                    </Link>
                  ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
