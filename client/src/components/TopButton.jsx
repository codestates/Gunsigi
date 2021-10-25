import React from 'react';

function TopButton() {
  const handlerTopButton = () => window.scrollTo({ top: 0 });

  return (
    <div className="topButton">
      <div
        onClick={handlerTopButton}
        role="button"
        tabIndex={0}
        onKeyPress={handlerTopButton}
      >
        <img alt="Top Button" src="/icons/icon_top_btn.svg" />
      </div>
    </div>
  );
}

export default TopButton;
