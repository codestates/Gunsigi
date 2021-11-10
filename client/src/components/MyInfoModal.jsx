/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setNickname, setProfileImg } from '../actions/userAction';
import WithdrawalModal from './WithdrawalModal';
import { nicknameValidator, passwordValidator } from '../utils/validation';
import { stopScroll, clearStopScroll } from '../utils/ModalScrollPrevent';
import '../styles/Mypage/MyInfoModal.scss';

function MyInfoModal({ openModalHandler, userType }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.userReducer);
  const { nickName, profileImg } = userState;

  const [isOpenWithdrawl, setIsOpenWithdrawl] = useState(false);

  const [modifyForm, setModifyForm] = useState({
    profileImg,
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  // * 스크롤 방지
  useEffect(() => {
    stopScroll();
    return () => {
      clearStopScroll();
    };
  }, []);

  const openWithdrawlHandler = () => {
    setIsOpenWithdrawl(!isOpenWithdrawl);
  };

  // * onChange 변화 감지 핸들러
  const handleFormChange = (event) => {
    setModifyForm({
      ...modifyForm,
      [event.target.name]: event.target.value,
    });
    setErrorMsg('');
  };

  // * 로컬 이미지 업로드 base64 인코딩
  const profileImageHandler = (e) => {
    const reader = new FileReader();
    // 1. 파일을 읽어 버퍼에 저장합니다.
    reader.readAsDataURL(e.target.files[0]);
    // 파일 상태 업데이트
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;

      if (base64) {
        const base64Sub = base64.toString();

        setModifyForm({ ...modifyForm, profileImg: base64Sub });
        // 파일 base64 상태 업데이트
      }
    };
  };

  const deleteProfileImageHandler = () => {
    setModifyForm({ ...modifyForm, profileImg: '' });
  };

  // * 회원 정보 수정 요청
  const modifyMyInfoHandler = (event) => {
    event.preventDefault();
    const { nickname, password, passwordCheck } = modifyForm;

    if (
      modifyForm.profileImg === profileImg &&
      nickname === '' &&
      password === '' &&
      passwordCheck === ''
    ) {
      setErrorMsg('수정을 원하시면 최소 하나는 변경하셔야 됩니다');
      return;
    }

    if (nickname !== '') {
      if (nickname === nickName) {
        setErrorMsg('현재 닉네임과 동일한 닉네임 입니다');
        return;
      }
      if (!nicknameValidator(nickname)) {
        setErrorMsg('닉네임은 2~10자리 특수문자 제외하고 가능합니다');
        return;
      }
    }

    if (password !== '') {
      if (!passwordValidator(password)) {
        setErrorMsg('비밀번호는 8자이상, 영문과 숫자를 포함해야합니다');
        return;
      }
      if (password !== passwordCheck) {
        setErrorMsg('비밀번호가 일치하지 않습니다');
        return;
      }
    }

    const data = {
      nickname,
      password,
      profileImage: modifyForm.profileImg,
    };

    // 똑같은 이미지면 업데이트 되지 않게 키값 삭제
    if (modifyForm.profileImg === profileImg) delete data.profileImage;

    axios.patch('/users/', data).then((res) => {
      const { profileImage } = res.data.userInfo;
      dispatch(setNickname(res.data.userInfo.nickname));
      dispatch(setProfileImg(profileImage));
      openModalHandler();
      history.push('/mypage');
    });
  };

  // * input 엔터키 누르면 요청해주는 핸들러
  const handeleEnterForm = (event) => {
    if (event.key === 'Enter') {
      modifyMyInfoHandler(event);
    }
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
            <div onClick={deleteProfileImageHandler} aria-hidden="true">
              <span>x</span>
              <img
                className="profile_img"
                src={modifyForm.profileImg || '/images/profile-min.jpg'}
                alt="profile"
              />
            </div>
            <span>프로필 이미지 수정</span>
            <label htmlFor="clip">
              <img
                className="clip_icon"
                src="/icons/icon_clip.svg"
                alt="clip"
              />
              <input
                type="file"
                id="clip"
                accept="image/*"
                onChange={profileImageHandler}
                onKeyUp={handeleEnterForm}
                name="profileImg"
              />
            </label>
          </div>
          <div className="nickname_modify">
            <label htmlFor="nickname">
              닉네임 수정
              <input
                id="nickname"
                type="text"
                placeholder="닉네임"
                name="nickname"
                onChange={handleFormChange}
                onKeyUp={handeleEnterForm}
                value={modifyForm.nickname}
              />
            </label>
          </div>
          <div className="password_modify">
            <label htmlFor="password">
              비밀번호 수정
              <input
                id="password"
                type="password"
                placeholder={
                  userType === 'email'
                    ? '비밀번호'
                    : '소셜 로그인은 해당 정책상'
                }
                name="password"
                onChange={handleFormChange}
                onKeyUp={handeleEnterForm}
                value={modifyForm.password}
                disabled={userType !== 'email' || false}
              />
            </label>
            <input
              type="password"
              placeholder={
                userType === 'email'
                  ? '비밀번호 확인'
                  : '비밀번호 수정이 불가합니다'
              }
              name="passwordCheck"
              onChange={handleFormChange}
              onKeyUp={handeleEnterForm}
              value={modifyForm.passwordCheck}
              disabled={userType !== 'email' || false}
            />

            <span
              className={errorMsg ? 'modify_notice' : 'modify_notice dummy'}
            >
              {errorMsg || '회원 정보 수정 dummy notice입니다'}
            </span>
          </div>
          <div className="btns_container">
            <button
              className="modify_btn"
              type="submit"
              onClick={modifyMyInfoHandler}
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
