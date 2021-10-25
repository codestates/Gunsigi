import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import Main from './pages/Main';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Mypage from './pages/Mypage';

function App() {
  return (
    <div>
      {/* <Router>
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
      </Router> */}
      <Mypage />
    </div>
  );
}

export default App;
