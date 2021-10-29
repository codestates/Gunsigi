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
<<<<<<< HEAD
=======
import SearchModal from './components/SearchModal';
>>>>>>> 5a1bb3d (fix: introTwo,nav,navChange 버튼,효과 수정)

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

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
