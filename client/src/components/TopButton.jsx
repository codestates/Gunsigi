import React, { useEffect, useState } from 'react';
import '../styles/TopButton.scss';

function TopButton() {
  // 탑버튼 스크롤 관련
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScrollPosition = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPosition);
    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
    };
  });

  const handleTopButton = () => window.scrollTo({ top: 0 });

  return (
    <>
      {scrollPosition > 100 ? (
        <button
          className="topButton"
          type="button"
          onClick={handleTopButton}
          onKeyPress={handleTopButton}
        >
          <img alt="Top Button" src="/icons/icon_arrow_up.svg" />
        </button>
      ) : null}
    </>
  );
}

export default TopButton;
