import React from 'react';
import '../styles/ErrorModal.scss';

function ErrorModal({ errorMsg, errorModalHandler }) {
  return (
    <div
      id="error-wrapper"
      onClick={() => errorModalHandler(false, '')}
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
          onClick={() => errorModalHandler(false, '')}
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
