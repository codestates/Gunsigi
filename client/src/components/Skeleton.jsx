import React from 'react';
import '../styles/Skeleton.scss';

function Skeleton() {
  const items = [0, 0, 0, 0, 0, 0];

  return (
    <div className="skeleton-container">
      {items.map(() => (
        <div className="card">
          <div className="image shine" />
          <div className="text shine" />
          <div className="text " />
          <div className="icon shine" />
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
