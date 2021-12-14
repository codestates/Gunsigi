import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setNickname, setProfileImg } from '../actions/userAction';
import { setEmailCheckModal } from '../actions/modalAction';
import MyInfoModal from './MyInfoModal';
import '../styles/Mypage/Profile.scss';

function Profile() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { nickName, profileImg } = userState;

  const [isOpenMyInfo, setIsOpenMyInfo] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isVerified, setIsVerified] = useState(true);

  const handleMyInfoModalClick = () => {
    setIsOpenMyInfo(!isOpenMyInfo);
  };

  // * 이메일 인증 재요청
  const handleEmailVerifyBtnClick = () => {
    axios.get('/auth/email').then(() => {
      dispatch(setEmailCheckModal(true));
    });
  };

  // * 처음 랜더링 될 때 회원정보를 가져온다.
  useEffect(() => {
    axios.get('/users').then((res) => {
      const {
        email,
        nickname,
        profileImage,
        type,
        verified,
      } = res.data.userInfo;
      dispatch(setNickname(nickname));
      dispatch(setProfileImg(profileImage));
      setUserEmail(email);
      setUserType(type);
      setIsVerified(verified);
    });
  }, []);

  return (
    <>
      <div id="profile_container">
        <div id="profile_info">
          <img
            className="profile_img"
            src={profileImg || '/images/profile-min.jpg'}
            alt="profile"
          />
          <div id="nickname-email_container">
            <span className="profile_nickname">{nickName}</span>
            <div id="profile_email">
              {isVerified && <img src="/icons/icon_shield.svg" alt="shield" />}
              <span id="user-email" title={userEmail}>{userEmail}</span>
            </div>
            {!isVerified && (
              <button
                type="button"
                className="verifyBtn"
                onClick={handleEmailVerifyBtnClick}
              >
                <img
                  alt="send icon"
                  className="icon-send"
                  src="/icons/icon_send.svg"
                />
                <span>이메일 인증하기</span>
              </button>
            )}
          </div>
        </div>
        <img
          id="profile_set"
          src="/icons/icon_gear.svg"
          alt="gear"
          onClick={handleMyInfoModalClick}
          aria-hidden="true"
        />
      </div>
      {isOpenMyInfo && (
        <MyInfoModal handleMyInfoModalClick={handleMyInfoModalClick} userType={userType} />
      )}
    </>
  );
}

export default Profile;
