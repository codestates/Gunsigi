import React from 'react';
import axios from 'axios';
import KakaoLoin from 'react-kakao-login';

export default function Kakao() {
  const responseKakao = (response) => {
    console.log(response);
  };

  return (
    <KakaoLoin
      token="c8a6918d2c0f5b723a99684e56229596"
      onSuccess={responseKakao}
      onFail={console.log}
      onLogout={console.log}
    />
  );
}
