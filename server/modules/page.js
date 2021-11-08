/**
 * pagination: API의 응답값 생성모듈
 */

module.exports = (params) => {
  const page = parseInt(params.page, 10);
  const size = parseInt(params.size, 10);
  const count = parseInt(params.count, 10);

  return {
    page, size, total: parseInt(count / size, 10) + (count % size ? 1 : 0),
  };
};
