import React from 'react';
import axios from 'axios';
import KakaoLoin from 'react-kakao-login';
import { useDispatch } from 'react-redux';
import loginState from '../actions/userAction';
import { setLoginModal, setSignupModal } from '../actions/modalAction';

export default function Kakao() {
  const dispatch = useDispatch();

  const responseKakao = async (response) => {
    const accessToken = response.response.access_token;
    // 서버에 카카오에서 받은 토큰 검증요청
    axios
      .post('/callback/kakao', { accessToken })
      .then(() => {
        // 검증 및 로그인 or 회원가입 성공
        dispatch(loginState(true));
        dispatch(setLoginModal(false));
        dispatch(setSignupModal(false));
      });
  };

  return (
    <KakaoLoin
      token="c8a6918d2c0f5b723a99684e56229596"
      onSuccess={responseKakao}
      render={(renderProps) => (
        <img
          src="/kakao_Logo.png"
          alt="kakao"
          onClick={renderProps.onClick}
          aria-hidden="true"
        />
      )}
    />
  );
}
