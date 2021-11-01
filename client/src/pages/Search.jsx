import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { search } from '../assets/Search';
import NavChange from '../components/NavChange';
import Product from '../components/Product';
import '../styles/Search.scss';

function Search() {
  const [searchSequence, setSearchSequence] = useState(true);
  const [productList, setProductList] = useState([]);
  // todo: 처음 전체 제품리스트를 받아온다 - 조회순 (조회순 class명 체인지)
  // 모든 제품 리스트의 아이디는 링크의 path로 내려줘야함
  // todo: 인풋창에 검색을 하면 해당 인풋대로 서버에 요청 query=
  // todo: 리뷰순 클릭시, 리뷰순으로 재요청
  // todo: 100개 이후에는 무한 스크롤 구현 page,size
  // todo: 탑버튼 구현
  // useEffect(() => {
  //   axios
  //     .get('/products?query=루&order=views')
  //     .then((res) => {
  //       const products = res.body.items;
  //       setProductList(products);
  //       console.log(productList);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
      <NavChange />
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img" />
          <div className="Search_bottom">
            <div className="Search_title">
              <div>
                전체 건강기능식품
                <span>{`(${search.length})`}</span>
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
              {search.map((item) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
