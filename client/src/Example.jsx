import React from 'react';
// import PropTypes from 'prop-types';

function Example() {
  const handler = () => {
    console.log('확인');
  };
  return (
    <div>
      <div onClick={() => handler()} aria-hidden="true">
        Hello&nbsp;
      </div>
    </div>
  );
}
// Example.propTypes = {
//   x: PropTypes.string.isRequired,
//   arrCopy: PropTypes.string.isRequired,
//   object: PropTypes.string.isRequired,
//   num: PropTypes.number.isRequired,
//   handler: PropTypes.node.isRequired,
// };

export default Example;
