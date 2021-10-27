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
          heart={item.heart}
          star={item.star}
          reviews={item.reviews}
          img={item.img}
        />
      ))}
    </div>
  );
}

export default MyProducts;
