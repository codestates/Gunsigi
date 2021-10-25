import React from 'react';
import '../styles/Mypage/Mypage.scss';
import Profile from '../components/Profile';
import MyActivity from '../components/MyActivity';

function Mypage() {
  return (
    <div id="mypage_container">
      <Profile />
      <MyActivity />
    </div>
  );
}

export default Mypage;
