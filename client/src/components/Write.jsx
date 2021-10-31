import React, { useEffect, useState } from 'react';
import '../styles/Write.scss';

function Write({ openReviewHandler }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  //! scroll 위치 알려주는 함수
  const scrollPositionHandler = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollPositionHandler);
    return () => {
      window.removeEventListener('scroll', scrollPositionHandler);
    };
  });

  return (
    <div className="Write">
      {scrollPosition > 60 ? (
        <div
          aria-hidden="true"
          onClick={() => scrollTo({ top: 0 })}
          className="top_button"
        >
          <img src="icons/icon_arrow_left.svg" alt="top" />
        </div>
      ) : null}
      <div
        className="write_button"
        onClick={openReviewHandler}
        aria-hidden="true"
      >
        <img src="icons/icon_write.svg" alt="write" />
      </div>
    </div>
  );
}

export default Write;
