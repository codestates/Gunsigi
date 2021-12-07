import React, { useEffect } from 'react';
import { stopScroll, clearStopScroll } from '../utils/ModalScrollPrevent';
import '../styles/ErrorModal.scss';

function ErrorModal({ errorMsg, handleErrorModalClick }) {
  // * 스크롤 방지
  useEffect(() => {
    stopScroll();
    return () => {
      clearStopScroll();
    };
  }, []);

  return (
    <div
      id="error-wrapper"
      onClick={() => handleErrorModalClick(false, '')}
      aria-hidden="true"
    >
      <div
        id="error"
        className="animated shake"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <h2>
          Connection Error
          <img src="/icons/icon_sad.svg" alt="sad" />
        </h2>
        <p>{errorMsg}</p>
        <div
          className="try-again"
          onClick={() => handleErrorModalClick(false, '')}
          aria-hidden="true"
        >
          다시 시도해 주세요
          <img src="/icons/icon_retry.svg" alt="retry" />
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
