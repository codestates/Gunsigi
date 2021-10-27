import React, { useState } from 'react';
import '../styles/Mypage/Profile.scss';
import MyInfoModal from './MyInfoModal';

function Profile() {
  const [isOpenMyInfo, setIsOpenMyInfo] = useState(false);
  const [userImgSrc, setUserImgSrc] = useState('/images/profile.png');

  const openModalHandler = () => {
    setIsOpenMyInfo(!isOpenMyInfo);
  };

  return (
    <>
      <div id="profile_container">
        <div id="profile_info">
          <img className="profile_img" src={userImgSrc} alt="profile" />
          <div id="nickname-email_container">
            <span className="profile_nickname">KimCoding</span>
            <span id="profile_email">kimcoding@codestates.com</span>
          </div>
        </div>
        <img
          id="profile_set"
          src="/icons/icon_gear.svg"
          alt="gear"
          onClick={openModalHandler}
          aria-hidden="true"
        />
      </div>
      {isOpenMyInfo && (
        <MyInfoModal
          openModalHandler={openModalHandler}
          userImgSrc={userImgSrc}
        />
      )}
    </>
  );
}

export default Profile;
