import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../../actions/userAction';
import {
  setLoginModal,
  setSignupModal,
  setEmailCheckModal,
} from '../../actions/modalAction';
import {
  emailValidator,
  nicknameValidator,
  passwordValidator,
} from '../../utils/validation';
import Google from '../Google';
import Kakao from '../Kakao';
import '../../styles/LoginSignup/Signup.scss';

function Signup() {
  const dispatch = useDispatch();

  // * input DOM 접근
  const inputEmail = useRef(null);
  const inputNickname = useRef(null);
  const inputPassword = useRef(null);

  const [signupForm, setSignupForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    email: '',
    nickname: '',
    passwordCheck: '',
  });

  const [isSignupErr, setIsSignupErr] = useState({
    email: false,
    nickname: false,
    password: false,
  });

  // * 유효성 검사 실패시 에러 메세지를 출력하는 핸들러
  const handleErrorMsg = (target, message) => {
    setErrorMsg({
      ...errorMsg,
      [target]: message,
    });
  };

  // * 유효성 검사 실패시 흔들리는 인풋 효과 설정해주는 핸들러
  const handleShakeInput = (target) => {
    switch (target) {
      case 'email':
        setIsSignupErr({
          ...isSignupErr,
          email: true,
        });
        setTimeout(() => {
          setIsSignupErr({
            ...isSignupErr,
            email: false,
          });
        }, 800);
        break;

      case 'nickname':
        setIsSignupErr({
          ...isSignupErr,
          nickname: true,
        });
        setTimeout(() => {
          setIsSignupErr({
            ...isSignupErr,
            email: false,
          });
        }, 800);
        break;

      case 'password':
        setIsSignupErr({
          ...isSignupErr,
          password: true,
        });
        setTimeout(() => {
          setIsSignupErr({
            ...isSignupErr,
            password: false,
          });
        }, 800);
        break;

      default:
        break;
    }
  };

  // * onChange 변화 감지 핸들러
  const handleFormChange = (event) => {
    setSignupForm({
      ...signupForm,
      [event.target.name]: event.target.value,
    });
    // * 입력을 시작하면 에러메세지를 지움
    handleErrorMsg(event.target.name, '');
  };

  // * 회원가입 양식 제출 핸들러
  const handleSignup = async (event) => {
    event.preventDefault();

    // * 유효성 검사
    if (!signupForm.email) {
      inputEmail.current.focus();
      handleErrorMsg('email', '이메일을 입력해주세요');
      handleShakeInput('email');
      return;
    }

    if (!emailValidator(signupForm.email)) {
      inputEmail.current.focus();
      handleErrorMsg('email', '잘못된 형식의 이메일입니다');
      handleShakeInput('email');
      return;
    }

    if (!signupForm.nickname) {
      inputNickname.current.focus();
      handleErrorMsg('nickname', '닉네임을 입력해주세요');
      handleShakeInput('nickname');
      return;
    }

    if (!nicknameValidator(signupForm.nickname)) {
      inputNickname.current.focus();
      handleErrorMsg(
        'nickname',
        '닉네임은 2~10자리, 특수문자 제외하고 가능합니다',
      );
      handleShakeInput('nickname');
      return;
    }

    if (!passwordValidator(signupForm.password)) {
      inputPassword.current.focus();
      handleErrorMsg(
        'passwordCheck',
        '비밀번호는 8자이상, 영문과 숫자를 포함해야합니다',
      );
      handleShakeInput('password');
      return;
    }

    if (!(signupForm.password && signupForm.passwordCheck)) {
      handleErrorMsg('passwordCheck', '비밀번호를 모두 입력해주세요');
      handleShakeInput('password');
      return;
    }

    if (signupForm.password !== signupForm.passwordCheck) {
      handleErrorMsg('passwordCheck', '비밀번호가 일치하지 않습니다');
      handleShakeInput('password');
      return;
    }

    // * 이메일 중복 체크
    const response = await axios.get('/auth/overlap', {
      params: { email: signupForm.email },
    });

    if (!response.data.result) {
      inputEmail.current.focus();
      handleErrorMsg('email', '이미 가입하신 이메일입니다');
      handleShakeInput('email');
      return;
    }

    // * 회원가입 API 요청
    axios
      .post('/auth/signup', signupForm, { loading: false })
      .then(() => {
        dispatch(setLoginState(true));
        dispatch(setSignupModal(false));
        dispatch(setLoginModal(false));
        dispatch(setEmailCheckModal(true));
      })
      .catch((err) => {
        try {
          const { status } = err.response;
          if (status === 400) {
            handleErrorMsg(
              'passwordCheck',
              '입력하신 정보들을 다시 한번 확인해주세요',
            );

            setTimeout(() => handleErrorMsg(''), 5000);
          } else if (status === 403) {
            inputEmail.current.focus();
            handleErrorMsg('email', '이미 가입하신 이메일입니다');
            handleShakeInput('email');

            setTimeout(
              () => setErrorMsg({ email: '', nickname: '', passwordCheck: '' }),
              5000,
            );
          } else {
            handleErrorMsg('passwordCheck', '통신에 문제가 발생했습니다');
          }
        } catch (error) {
          handleErrorMsg('passwordCheck', '통신에 문제가 발생했습니다');
          console.log(error);
        }
      });
  };

  // * input 엔터키 누르면 요청해주는 핸들러
  const handeleEnterForm = (event) => {
    if (event.key === 'Enter') {
      handleSignup(event);
    }
  };

  // * 구글 소셜 로그인 요청 핸들러
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
        if (err.response.status === 403) {
          handleErrorMsg(
            'passwordCheck',
            '이미 해당 계정의 gmail로 가입하셨습니다',
          );
        }
      });
  };

  // * 카카오 소셜 로그인 요청 핸들러
  const responseKakao = async (response) => {
    const accessToken = response.response.access_token;
    // 서버에 카카오에서 받은 토큰 검증요청
    axios
      .post('/callback/kakao', { accessToken })
      .then(() => {
        // 검증 및 로그인 or 회원가입 성공
        dispatch(setLoginState(true));
        dispatch(setLoginModal(false));
        dispatch(setSignupModal(false));
      })
      .catch((err) => {
        if (err.response.status === 403) {
          handleErrorMsg(
            'passwordCheck',
            '이미 해당 계정의 이메일로 가입하셨습니다',
          );
        }
      });
  };

  return (
    <div className="Signup_container">
      <div className="Signup_in">
        <div className="title">회원가입</div>
        <div className="input">
          <div className="email">
            <input
              className={
                !isSignupErr.email
                  ? 'Signup_input'
                  : 'Signup_input input_change'
              }
              type="email"
              placeholder="이메일"
              name="email"
              value={signupForm.email}
              onChange={handleFormChange}
              onKeyUp={handeleEnterForm}
              ref={inputEmail}
            />
            <div
              className={
                errorMsg.email ? 'signup_notice' : 'signup_notice dummy'
              }
            >
              {errorMsg.email || '회원 가입 dummy notice입니다'}
            </div>
          </div>
          <div className="nickname">
            <input
              className={
                !isSignupErr.nickname
                  ? 'Signup_input'
                  : 'Signup_input input_change'
              }
              type="text"
              placeholder="닉네임"
              name="nickname"
              value={signupForm.nickname}
              onChange={handleFormChange}
              onKeyUp={handeleEnterForm}
              ref={inputNickname}
            />
            <div
              className={
                errorMsg.nickname ? 'signup_notice' : 'signup_notice dummy'
              }
            >
              {errorMsg.nickname || '회원 가입 dummy notice입니다'}
            </div>
          </div>
          <div className="password">
            <input
              className={
                !isSignupErr.password
                  ? 'Signup_input'
                  : 'Signup_input input_change'
              }
              type="password"
              placeholder="비밀번호"
              name="password"
              value={signupForm.password}
              onChange={handleFormChange}
              onKeyUp={handeleEnterForm}
              ref={inputPassword}
            />
            <div className="check">
              <input
                className={
                  !isSignupErr.password
                    ? 'Signup_input'
                    : 'Signup_input input_change'
                }
                type="password"
                placeholder="비밀번호 확인"
                name="passwordCheck"
                value={signupForm.passwordCheck}
                onChange={handleFormChange}
                onKeyUp={handeleEnterForm}
              />
              <div
                className={
                  errorMsg.passwordCheck
                    ? 'signup_notice'
                    : 'signup_notice dummy'
                }
              >
                {errorMsg.passwordCheck || '회원 가입 dummy notice입니다'}
              </div>
            </div>
          </div>
        </div>
        <div className="icon">
          <Google responseGoogle={responseGoogle} />
          <Kakao responseKakao={responseKakao} />
        </div>
        <button type="button" onClick={handleSignup}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;
