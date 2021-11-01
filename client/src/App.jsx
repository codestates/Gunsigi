import React, { useEffect, useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import setAxios, { updateToken } from './utils/ApiController';
import Main from './pages/Main';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Mypage from './pages/Mypage';
import TopButton from './components/TopButton';
import Loading from './components/Loading';

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(async () => {
    /**
     * 리액트가 처음 렌더링 될 때 실행됩니다.
     * axios세팅후 토큰갱신을 시도합니다.
     */
    await setAxios(setToken, setIsLoading);
    let newToken;
    try {
      newToken = await updateToken();
    } catch {
      // 토큰 갱신에 실패했습니다.
      return;
    }
    // 새로 받은 토큰상태를 변경합니다.
    setToken(newToken);

    // 리덕스 isLogin 설정필요.
  }, []);

  useEffect(() => {
    // token 상태 변경 시 axios에서 설정해놓은 헤더를 새로운 토큰값으로 변경합니다.
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  return (
    <div className="App">
      {isLoading ? <Loading /> : null}
      {scrollPosition > 60 ? <TopButton /> : null}
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/search" component={Search}>
            <Search />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
          <Route path="/product-detail/:id" component={ProductDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
