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

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { isLogin } = userState;
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  window.addEventListener('load', () => {
    setIsLoading(false);
  });

  useEffect(async () => {
    await setAxios(setToken, setIsLoading);
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

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/search" component={Search}>
          <Search />
        </Route>
        <Route path="/mypage" component={Mypage}>
          {isLogin ? <Mypage /> : <Redirect to="/" />}
        </Route>
        <Route path="/product-detail/:id" component={ProductDetail} />
      </Switch>
    </div>
  );
}
export default App;
