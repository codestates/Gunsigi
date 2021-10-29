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
import Loading from './components/Loading';

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      {isLoading ? <Loading /> : null}
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
