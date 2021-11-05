import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import MyProducts from './MyProducts';
import MyReviews from './MyReviews';
import { inMypage } from '../actions/inoutMypageAction';
import '../styles/Mypage/MyActivity.scss';

function MyActivity() {
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { myProducts } = userState;

  const [currentTab, setCurrentTab] = useState(0);

  const [reviewCount, setRieviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);

  const menuArr = [
    {
      name: `나의 건강기능식품 (${myProducts.length})`,
      content: <MyProducts />,
    },
    { name: '|' },
    {
      name: `내가 쓴 리뷰 (${reviewCount})`,
      content: <MyReviews reviews={reviews} setReviews={setReviews} />,
    },
  ];

  //! 내가 쓴 리뷰요청
  useEffect(async () => {
    await axios({
      url: '/reviews?page=1&size=5',
      loading: false,
    }).then((res) => {
      setReviews(res.data.items);
      setRieviewCount(res.data.pages.itemsCount);
    });
  }, []);

  return (
    <div className="my-activity_container">
      <ul aria-hidden="true" onClick={() => dispatch(inMypage())} id="tab_menu">
        {menuArr.map((el, index) => (
          <li
            key={el.name}
            className={currentTab === index ? 'submenu focused' : 'submenu'}
            onClick={() => setCurrentTab(index)}
            aria-hidden="true"
          >
            {el.name}
          </li>
        ))}
      </ul>

      <ul className="my-contents">{menuArr[currentTab].content}</ul>
    </div>
  );
}

export default MyActivity;
