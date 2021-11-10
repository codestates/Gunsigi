import React from 'react';
import KakaoLoin from 'react-kakao-login';

export default function Kakao({ responseKakao }) {
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
