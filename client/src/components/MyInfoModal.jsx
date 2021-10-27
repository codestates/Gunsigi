import React, { useState } from 'react';
import '../styles/Mypage/MyInfoModal.scss';
import WithdrawalModal from './WithdrawalModal';

function MyInfoModal({ openModalHandler, userImgSrc }) {
  const [isOpenWithdrawl, setIsOpenWithdrawl] = useState(false);

  const openWithdrawlHandler = () => {
    setIsOpenWithdrawl(!isOpenWithdrawl);
  };

  return (
    <>
      <div
        className="modal_container"
        onClick={openModalHandler}
        aria-hidden="true"
      >
        <form
          className="modal_view"
          onClick={(e) => e.stopPropagation()}
          aria-hidden="true"
        >
          <span className="title">회원정보 수정</span>
          <div className="img_info">
            <img className="profile_img" src={userImgSrc} alt="profile" />
            <span>
              프로필 이미지 수정
              <img
                className="clip_icon"
                src="/icons/icon_clip.svg"
                alt="clip"
              />
            </span>
          </div>
          <div className="nickname_modify">
            <label htmlFor="nickname">
              닉네임 수정
              <input id="nickname" type="text" placeholder="닉네임" />
            </label>
          </div>
          <div className="password_modify">
            <label htmlFor="password">
              비밀번호 수정
              <input id="password" type="password" placeholder="비밀번호" />
            </label>
            <input type="password" placeholder="비밀번호 확인" />
            <span className="password_notice">
              비밀번호가 일치하지 않습니다.
            </span>
          </div>
          <div className="btns_container">
            <button
              className="modify_btn"
              type="submit"
              onClick={openModalHandler}
            >
              회원 정보 수정
            </button>
            <button
              className="withdrawal_btn"
              type="button"
              onClick={openWithdrawlHandler}
            >
              회원 탈퇴
            </button>
          </div>
        </form>
        <div className="modify_img_container">
          <img src="logo_gunsigi.png" alt="logo" />
        </div>
      </div>
      {isOpenWithdrawl && (
        <WithdrawalModal openWithdrawlHandler={openWithdrawlHandler} />
      )}
    </>
  );
}

export default MyInfoModal;
