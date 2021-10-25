import React, { useState } from 'react';
import './App.scss';
import Main from './pages/Main';
import setAxios from './utils/ApiController';
import TopButton from './components/TopButton';

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  //! scroll 위치 알려주는 함수
  const scrollPositionHandler = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  return (
    <div className="App">
      {scrollPosition > 60 ? <TopButton /> : null}

      <Main />
    </div>
  );
}

export default App;
