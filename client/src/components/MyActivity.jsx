import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import MyProducts from './MyProducts';
import MyReviews from './MyReviews';
import { inMypage } from '../actions/inoutMypageAction';
import '../styles/Mypage/MyActivity.scss';

function MyActivity() {
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { myProductsCnt } = userState;

  const [currentTab, setCurrentTab] = useState(0);

  const [reviewCount, setRieviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);

  const myContentsEl = useRef(null);
  const [myContentsScrollY, setMyContentsScrollY] = useState(0);

  const menuArr = [
    {
      name: `나의 건강기능식품 (${myProductsCnt})`,
      content: <MyProducts />,
    },
    { name: '|' },
    {
      name: `내가 쓴 리뷰 (${reviewCount})`,
      content: (
        <MyReviews
          setRieviewCount={setRieviewCount}
          reviews={reviews}
          setReviews={setReviews}
        />
      ),
    },
  ];

  // * topbutton 스크롤 위치 감지
  const handleScrollY = () => {
    setMyContentsScrollY(myContentsEl.current.scrollTop);
  };

  // * 내가 쓴 리뷰요청, 스크롤 위치 함수 연결
  useEffect(async () => {
    await axios({
      url: '/reviews?page=1&size=5',
      loading: false,
    }).then((res) => {
      setReviews(res.data.items);
      setRieviewCount(res.data.pages.itemsCount);
    });

    myContentsEl.current.addEventListener('scroll', handleScrollY);
    return () => {
      myContentsEl.current.removeEventListener('scroll', handleScrollY);
    };
  }, []);

  // * topbutton 스크롤 최상단 이벤트
  const handleTopButton = () => myContentsEl.current.scrollTo({ top: 0 });

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

      <ul className="my-contents" ref={myContentsEl}>
        {menuArr[currentTab].content}
        {myContentsScrollY > 100 && (
          <button
            className="topButton"
            type="button"
            onClick={handleTopButton}
            onKeyPress={handleTopButton}
          >
            <img alt="Top Button" src="/icons/icon_arrow_up.svg" />
          </button>
        )}
      </ul>
    </div>
  );
}

export default MyActivity;
