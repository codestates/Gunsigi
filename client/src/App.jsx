import React, { useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import setAxios from './utils/ApiController';
import Main from './pages/Main';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Mypage from './pages/Mypage';
import TopButton from './components/TopButton';
import SearchModal from './components/SearchModal';

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  //! scroll 위치 알려주는 함수
  const scrollPositionHandler = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  return (
    <div className="App">
      {scrollPosition > 60 ? <TopButton /> : null}

      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/product-detail">
            <ProductDetail />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
