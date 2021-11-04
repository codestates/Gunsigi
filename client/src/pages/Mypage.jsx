/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/Mypage/Mypage.scss';
import Profile from '../components/Profile';
import MyActivity from '../components/MyActivity';
import NavChange from '../components/NavChange';
import { outMypage } from '../actions/inoutMypageAction';

function Mypage() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(outMypage());
    };
  }, []);

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
