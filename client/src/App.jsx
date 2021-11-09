import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import setAxios, { updateToken } from './utils/ApiController';
import { setLoginState } from './actions/userAction';
import Main from './pages/Main';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Mypage from './pages/Mypage';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import IsLogin from './components/IsLogin';
import ErrorModal from './components/ErrorModal';
import EmailCheckModal from './components/EmailCheckModal';
import Reset from './pages/Reset';
import PasswordSetting from './components/PasswordSetting';
import SucessEmailSend from './components/SucessEmailSend';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const modalState = useSelector((state) => state.modalReducer);
  const {
    isLoginTrueOrFalse,
    isOpenforgotPassword,
    isSuccessSendEmail,
    isOpenEmailCheck,
  } = modalState;
  const { isLogin } = userState;
  const [isLoading, setIsLoading] = useState(true);
  const [errorModal, setErrorModal] = useState({
    isOpenError: false,
    errorMsg: '',
  });
  const [token, setToken] = useState(null);

  window.addEventListener('load', () => {
    setIsLoading(false);
  });

  const errorModalHandler = (boolean, string) => {
    setErrorModal({ isOpenError: boolean, errorMsg: string });
  };

  useEffect(async () => {
    await setAxios(setToken, setIsLoading, errorModalHandler);
    let newToken;
    try {
      newToken = await updateToken();
    } catch (err) {
      console.log('err', err);
      // 토큰 갱신에 실패했습니다.
      dispatch(setLoginState(false));
      setToken(false);
      return;
    }
    // 새로 받은 토큰상태를 변경합니다.
    setToken(newToken);
    dispatch(setLoginState(true));
  }, []);

  useEffect(() => {
    // token 상태 변경 시 axios에서 설정해놓은 헤더를 새로운 토큰값으로 변경합니다.
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  if (token === null || isLogin === 'init') return '';

  return (
    <div className="App">
      {isLoading ? <Loading /> : null}
      {isLoginTrueOrFalse ? <IsLogin /> : null}
      {errorModal.isOpenError && (
        <ErrorModal
          errorMsg={errorModal.errorMsg}
          errorModalHandler={errorModalHandler}
        />
      )}
      {isOpenforgotPassword ? <PasswordSetting /> : null}
      {isSuccessSendEmail ? <SucessEmailSend /> : null}
      {isOpenEmailCheck && <EmailCheckModal />}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/mypage">
          {isLogin ? <Mypage /> : <Redirect to="/" />}
        </Route>
        <Route path="/product-detail/:id" component={ProductDetail} />
        <Route path="/reset">
          <Reset />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}
export default App;
