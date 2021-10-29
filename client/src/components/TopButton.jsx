import React from 'react';
import '../styles/TopButton.scss';

function TopButton() {
  const handlerTopButton = () => window.scrollTo({ top: 0 });

  return (
    <button
      className="topButton"
      type="button"
      onClick={handlerTopButton}
      onKeyPress={handlerTopButton}
    >
      <img alt="Top Button" src="/icons/icon_arrow_up.svg" />
    </button>
  );
}

export default TopButton;
