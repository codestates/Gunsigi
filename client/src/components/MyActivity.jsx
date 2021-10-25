import React, { useState } from 'react';
import MyProducts from './MyProducts';
import MyReviews from './MyReviews';
import '../styles/Mypage/MyActivity.scss';

function MyActivity() {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: '나의 건강기능식품 (05)', content: <MyProducts /> },
    { name: '|' },
    {
      name: '내가 쓴 리뷰 (12)',
      content: <MyReviews />,
    },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <div>
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

      <ul>{menuArr[currentTab].content}</ul>
    </div>
  );
}

export default MyActivity;
