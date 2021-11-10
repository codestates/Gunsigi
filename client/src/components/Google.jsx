import React from 'react';
import GoogleLogin from 'react-google-login';

export default function Google({ responseGoogle }) {
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
