import React from 'react';
import '../styles/NotFound.scss';

function NotFound() {
  return (
    <div className="notFound">
      <div className="content">
        <img alt="!" src="/icons/icon_warn.svg" />
        <p>404 Page Not Found</p>
        <p>잘못된 접근입니다</p>
      </div>
    </div>
  );
}

export default NotFound;
