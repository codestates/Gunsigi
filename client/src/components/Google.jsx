import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

export default function Google() {
  const responseGoogle = (response) => {
    const idToken = response.tokenObj.id_token;
    axios.post('/callback/google', { idToken })
      .then((res) => {
        // 가입 or 로그인완료
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const failureGoogle = (error) => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId="435773971165-rs382j5aj7ho7vgdsl9abp649v33ns0d.apps.googleusercontent.com"
      render={(renderProps) => (
        <button onClick={renderProps.onClick} type="button">구글로그인</button>
      )}
      onSuccess={responseGoogle}
      onFailure={failureGoogle}
    />
  );
}
