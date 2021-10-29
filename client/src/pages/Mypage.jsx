import React from 'react';
import '../styles/Mypage/Mypage.scss';
import Profile from '../components/Profile';
import MyActivity from '../components/MyActivity';
import NavChange from '../components/NavChange';

function Mypage() {
  return (
    <>
      <NavChange />
      <div id="mypage_container">
        <Profile />
        <MyActivity />
      </div>
    </>
  );
}

export default Mypage;
