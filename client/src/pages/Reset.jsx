import React, { useRef, useState } from 'react';
import '../styles/Reset.scss';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { passwordValidator } from '../utils/validation';
import { setLoginModal } from '../actions/modalAction';

function Reset() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const msg = [
    '',
    '비밀번호는 영문,숫자를 포함하여\n8자 이상 20자 이내여야 합니다',
    '비밀번호가 일치하지 않습니다',
    '모든 요소는 필수 요소입니다,\n입력창을 확인해 주세요',
  ];
  const [success, setSuccess] = useState(0);
  const [shakeOn, setShakeOn] = useState(false);
  const [inputValues, setInputValues] = useState({ password: '', confirm: '' });
  const [msgIdx, setMsgIdx] = useState({ password: 0, confirm: 0 });
  const confirmRef = useRef(null);

  const confirmPassword = (rePassword) => rePassword === inputValues.password;

  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    if (name === 'password' && value.length && !passwordValidator(value)) {
      setMsgIdx((prev) => ({ ...prev, password: 1 }));
      return;
    }

    if (name === 'confirm' && value.length && !confirmPassword(value)) {
      setMsgIdx({ ...msgIdx, confirm: 2 });
      return;
    }
    setMsgIdx({ ...msgIdx, [name]: 0 });
  };

  const handleResetPasswordBtn = async () => {
    if (
      !inputValues.password
      || !inputValues.confirm
      || msgIdx.password
      || msgIdx.confirm
    ) {
      // 인풋값이 다 안들어와 있으면 에러메세지, 흔들림효과
      setMsgIdx({ ...msgIdx, confirm: 3 });
      setShakeOn(true);
      setTimeout(() => {
        setShakeOn(false);
      }, 800);
      return;
    }
    confirmRef.current.blur();
    // 서버에 요청 보내고(바디에 비밀번호, 코드 (디코딩)넣어서), 성공시 setSuccess(true),
    // 403 다시 시도해 주세요,
    const code = decodeURIComponent(location.search.slice().split('=')[1]);
    axios
      .post('/auth/resetPassword', {
        password: inputValues.confirm,
        code,
      })
      .then(() => {
        setSuccess(1);
      })
      .catch(() => {
        setSuccess(2);
      });
  };

  const handleFocusForNext = (e) => {
    const target = e.target.name;
    if (target === 'password' && !msgIdx.password && e.key === 'Enter') {
      confirmRef.current.focus();
    }
    if (target === 'confirm' && !msgIdx.confirm && e.key === 'Enter') {
      handleResetPasswordBtn();
    }
  };

  const goBackToHome = () => {
    if (success) {
      dispatch(setLoginModal(true));
    }
    history.push('/');
  };

  return (
    <div className="reset">
      <div className="container">
        <div className="top-area">
          <img className="lock" alt="lock" src="/images/lock.png" />
        </div>
        <div className="title">
          <h3>비밀번호 재설정</h3>
        </div>
        {!success ? (
          <>
            <div className="input-area">
              <input
                className={!shakeOn ? 'new' : 'new shake'}
                type="password"
                name="password"
                placeholder="새로운 비밀번호를 입력해 주세요"
                onChange={handlePasswordInput}
                onKeyPress={handleFocusForNext}
              />
              <div className="msg">{msg[msgIdx.password]}</div>
              <input
                className={!shakeOn ? 'confirm' : 'confirm shake'}
                type="password"
                name="confirm"
                placeholder="비밀번호 재확인"
                onChange={handlePasswordInput}
                onKeyPress={handleFocusForNext}
                ref={confirmRef}
              />
              <div className="msg">{msg[msgIdx.confirm]}</div>
            </div>
            <div className="bottom-area">
              <button
                className="submitBtn"
                type="button"
                onClick={handleResetPasswordBtn}
              >
                비밀번호 재설정
              </button>
              <button className="backBtn" type="button" onClick={goBackToHome}>
                <img alt="gunsigi" src="/logo_g.png" />
                <span>메인으로 돌아가기</span>
              </button>
            </div>
          </>
        ) : (
          <div className="success">
            <div className="check">
              {success === 1 ? (
                <>
                  <div className="success-checkmark">
                    <div className="check-icon">
                      <span className="icon-line line-tip" />
                      <span className="icon-line line-long" />
                      <div className="icon-circle" />
                      <div className="icon-fix" />
                    </div>
                  </div>
                  <p className="success-message">SUCCESS</p>
                </>
              ) : (
                <>
                  <div className="fail-text">
                    토큰이 만료되었습니다, 다시 시도해 주세요
                  </div>
                  <div className="success-checkmark">
                    <div className="check-icon-x">
                      <span className="icon-line line-one" />
                      <span className="icon-line line-one line-second" />
                      <div className="icon-circle" />
                      <div className="icon-fix" />
                    </div>
                  </div>
                  <p className="fail-message">FAILURE</p>
                </>
              )}
            </div>
            <button
              className="lastBtn"
              type="button"
              onClick={goBackToHome}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reset;
