import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../actions/userAction';
import { setLoginModal, setSignupModal } from '../actions/modalAction';

export default function Google() {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    const idToken = response.tokenObj.id_token;
    axios
      .post('/callback/google', { idToken })
      .then(() => {
        // 가입 or 로그인완료
        dispatch(setLoginState(true));
        dispatch(setLoginModal(false));
        dispatch(setSignupModal(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <GoogleLogin
      clientId="435773971165-rs382j5aj7ho7vgdsl9abp649v33ns0d.apps.googleusercontent.com"
      render={(renderProps) => (
        <img
          src="/google_Logo.png"
          alt="google"
          onClick={renderProps.onClick}
          aria-hidden="true"
        />
      )}
      onSuccess={responseGoogle}
    />
  );
}
