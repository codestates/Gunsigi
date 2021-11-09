/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const { User } = require('../models');

module.exports = async () => {
  const count = await User.count();
  if (count > 0) return false;
  // 없는 경우에만 데이터 넣기.
  const users = [
    {
      nickname: 'doldolma',
      email: 'iidd0101@naver.com',
      password: '123123',
      type: 'email',
      reviewsCount: 3,
      verified: true,
    },
    {
      nickname: 'doldolme',
      email: 'iidd0102@naver.com',
      password: '123123',
      type: 'email',
      reviewsCount: 1,
      verified: true,
    },
    {
      nickname: 'doldolme',
      password: '123123',
      type: 'google',
      verified: true,
    },
    {
      nickname: 'doldolme',
      password: '123123',
      type: 'google',
      verified: true,
    },
  ];
  for (let i = 0; i < 100; i += 1) {
    users.push({
      nickname: '돌돌마',
      type: 'google',
      verified: true,
    });
  }
  return User.bulkCreate(users);
};
