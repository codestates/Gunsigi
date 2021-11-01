/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const { User } = require('../models');

module.exports = async () => {
  const count = await User.count();
  if (count === 0) {
    // 없는 경우에만 데이터 넣기.
    const users = [
      {
        nickname: 'doldolma',
        password: '123123',
        type: 'google',
        reviewsCount: 3,
      },
      {
        nickname: 'doldolme',
        password: '123123',
        type: 'google',
        reviewsCount: 1,
      },
      {
        nickname: 'doldolme',
        password: '123123',
        type: 'google',
      },
      {
        nickname: 'doldolme',
        password: '123123',
        type: 'google',
      },
    ];
    Array(100).fill(0).forEach(() => {
      users.push({
        nickname: '돌돌마',
        type: 'google',
      });
    });
    return User.bulkCreate(users);
  }
  // 데이터가 이미 있으면 성공처리
  return true;
};
