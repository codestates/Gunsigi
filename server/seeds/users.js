/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const { User } = require('../models');

module.exports = async () => {
  const count = await User.count();
  if (count === 0) {
    // 없는 경우에만 데이터 넣기.
    return User.bulkCreate([
      {
        email: 'iidd0101@naver.com',
        nickname: 'doldolma',
        password: '123123',
        type: 'google',
        reviewsCount: 3,
      },
      {
        email: 'iidd0102@naver.com',
        nickname: 'doldolme',
        password: '123123',
        type: 'google',
        reviewsCount: 1,
      },
      {
        email: 'iidd0103@naver.com',
        nickname: 'doldolme',
        password: '123123',
        type: 'google',
      },
      {
        email: 'iidd0104@naver.com',
        nickname: 'doldolme',
        password: '123123',
        type: 'google',
      },
    ]);
  }
  // 데이터가 이미 있으면 성공처리
  return Promise.resolve(true);
};
