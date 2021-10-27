import React from 'react';
import { search } from '../assets/Search';
import NavChange from '../components/NavChange';
import Product from '../components/Product';
import '../styles/Search.scss';

function Search() {
  return (
    <>
      <NavChange />
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img" />
          <div className="Search_bottom">
            <div className="Search_title">
              전체 건강기능식품
              <span>{`(${search.length})`}</span>
            </div>
            <div className="Search_products">
              {search.map((item) => (
                <Product
                  key={item.id}
                  name={item.name}
                  reviews={item.reviewsCount}
                  img={item.image}
                  score={item.score}
                  bookmark={item.isBookmarked}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
