import React from 'react';
import '../styles/Mypage/Mypage.scss';
import Profile from '../components/Profile';
import MyActivity from '../components/MyActivity';
import Nav from '../components/Nav';

function Mypage() {
  return (
    <>
      <Nav />
      <div id="mypage_container">
        <Profile />
        <MyActivity />
      </div>
    </>
  );
}

export default Mypage;
