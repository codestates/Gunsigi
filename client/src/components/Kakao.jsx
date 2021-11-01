import React from 'react';
import axios from 'axios';
import KakaoLoin from 'react-kakao-login';

export default function Kakao() {
  const responseKakao = async (response) => {
    const accessToken = response.response.access_token;
    // 서버에 카카오에서 받은 토큰 검증요청
    axios.post('/callback/kakao', { accessToken })
      .then((res) => {
        // 검증 및 로그인 or 회원가입 성공
        console.log(res.data);
      }).catch((err) => {
        console.log('err : ', err);
      });
  };

  return (
    <KakaoLoin
      token="c8a6918d2c0f5b723a99684e56229596"
      onSuccess={responseKakao}
      onFail={console.log}
      onLogout={console.log}
      render={(renderProps) => (
        <button type="button" onClick={renderProps.onClick}>카카오 로그인하기</button>
      )}
    />
  );
}
