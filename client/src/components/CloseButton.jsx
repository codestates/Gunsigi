import React from 'react';
import '../styles/CloseButton.scss';

function CloseButton({ onClick }) {
  return (
    <button className="close_btn" type="button" onClick={onClick}>
      <img src="/icons/icon_close.svg" alt="close" />
    </button>
  );
}

export default CloseButton;
