import React from 'react';
import { search } from '../assets/Search';
import Product from './Product';
import '../styles/Mypage/MyProducts.scss';

function MyProducts() {
  return (
    <div className="my-products">
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
  );
}

export default MyProducts;
