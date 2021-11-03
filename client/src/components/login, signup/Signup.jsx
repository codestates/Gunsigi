import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import loginState from '../../actions/userAction';
import { setSignupModal } from '../../actions/modalAction';
import { emailValidator, passwordValidator } from '../../utils/validation';
import Google from '../Google';
import Kakao from '../Kakao';
import '../../styles/LoginSignup/Signup.scss';

function Signup() {
  const dispatch = useDispatch();

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

    // * 해당 input DOM
    const email = document.querySelector('.Signup_in').children[1].children[0].children[0];
    const nickname = document.querySelector('.Signup_in').children[1].children[1].children[0];
    const password = document.querySelector('.Signup_in').children[1].children[2].children[0];

    // * 유효성 검사
    if (!signupForm.email) {
      email.focus();
      handleErrorMsg('email', '이메일을 입력해주세요');
      handleShakeInput('email');
      return;
    }

    if (!emailValidator(signupForm.email)) {
      email.focus();
      handleErrorMsg('email', '잘못된 형식의 이메일입니다');
      handleShakeInput('email');
      return;
    }

    if (!signupForm.nickname) {
      nickname.focus();
      handleErrorMsg('nickname', '닉네임을 입력해주세요');
      handleShakeInput('nickname');
      return;
    }

    if (!passwordValidator(signupForm.password)) {
      password.focus();
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
      email.focus();
      handleErrorMsg('email', '이미 가입하신 이메일입니다');
      handleShakeInput('email');
      return;
    }

    // * 회원가입 API 요청
    axios
      .post('/auth/signup', signupForm)
      .then(() => {
        dispatch(loginState(true));
        dispatch(setSignupModal(false));
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
            email.focus();
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
            />
            <div>{errorMsg.email}</div>
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
            />
            <div>{errorMsg.nickname}</div>
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
              <div>{errorMsg.passwordCheck}</div>
            </div>
          </div>
        </div>
        <div className="icon">
          <Google />
          <Kakao />
        </div>
        <button type="button" onClick={handleSignup}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;
