import React from 'react';
import '../styles/Write.scss';

function Write({ openReviewHandler }) {
  return (
    <div className="Write">
      <div className="top_button">
        <img src="icons/icon_arrow_left.svg" alt="top" />
      </div>
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
