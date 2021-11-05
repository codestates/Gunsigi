import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MyProducts from './MyProducts';
import MyReviews from './MyReviews';
import '../styles/Mypage/MyActivity.scss';

function MyActivity() {
  const userState = useSelector((state) => state.userReducer);
  const { myProducts } = userState;

  const [currentTab, setCurrentTab] = useState(0);
  const [reviewCount, setRieviewCount] = useState(0);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let page = 1;
  let total = 1;
  let lock = false;
  const [reviews, setReviews] = useState([]);

  const menuArr = [
    {
      name: `나의 건강기능식품 (${myProducts.length})`,
      content: <MyProducts />,
    },
    { name: '|' },
    {
      name: `내가 쓴 리뷰 (${reviewCount})`,
      content: (
        <MyReviews
          isLoaded={isLoaded}
          reviews={reviews}
          setReviews={setReviews}
          setTarget={setTarget}
        />
      ),
    },
  ];

  //! 내가 쓴 리뷰요청
  useEffect(async () => {
    await axios({
      url: '/reviews?page=1&size=5',
      loading: false,
    }).then((res) => {
      setReviews(res.data.items);
      setRieviewCount(res.data.pages.total);
      console.log('내가 쓴 리뷰 토탈', res.data.pages.total);
    });
  }, []);

  //! 더보기
  const getMoreItem = async () => {
    if (page > total) {
      setIsLoaded(false);
      return true;
    }

    const res = await axios({
      url: `/reviews?size=5&page=${page + 1}`,
      loading: false,
    });
    setReviews((review) => review.concat(res.data.items));
    page += 1;
    total = res.data.pages.total;
    setIsLoaded(false);
    lock = false;
    return false;
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded && !lock) {
      lock = true;
      setIsLoaded(true);
      observer.unobserve(entry.target);
      const result = await getMoreItem();
      if (!result) observer.observe(entry.target);
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

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className="my-activity_container">
      <ul id="tab_menu">
        {menuArr.map((el, index) => (
          <li
            key={el.name}
            className={currentTab === index ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
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
