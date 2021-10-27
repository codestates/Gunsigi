import React from 'react';
import { search } from '../assets/Search';
import Product from '../components/Product';
import '../styles/Search.scss';

function Search() {
  return (
    <div className="Search_conatiner">
      <div className="Search_in">
        <div className="Search_img" />
        <div className="Search_bottom">
          <div className="Search_title">
            전체 건강기능식품
            <span>{`(${200})`}</span>
          </div>
          <div className="Search_products">
            {search.map((item) => (
              <Product
                key={item.id}
                name={item.name}
                heart={item.heart}
                star={item.star}
                reviews={item.reviews}
                img={item.img}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
