/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const { Review } = require('../models');

module.exports = async () => {
  const count = await Review.count();
  if (count > 0) return false;
  // 없는 경우에만 데이터 넣기.
  const reviews = [
    {
      userId: 1,
      productId: 1,
      content: '약빨 너무 좋아요!!!! 최고',
      period: '1개월 이하',
      score: 4,
      likesCount: 2,
    },
    {
      userId: 1,
      productId: 2,
      content: '먹고 젊음을 되찾았습니다.',
      period: '1개월 이하',
      score: 5,
      likesCount: 2,
    },
    {
      userId: 1,
      productId: 3,
      content: '먹고 젊음을 되찾았습니다.',
      period: '3개월 이상',
      score: 5,
    },
    {
      userId: 2,
      productId: 3,
      content: '먹고 젊음을 되찾았습니다.',
      period: '6개월 이상',
      score: 5,
    },
  ];
  Math.floor(Math.random() * 10);
  const contentSamples = [
    '진짜 약빨이 엄청나서 어제 몸져누웠다가 한입 먹고 원기충전 제대로 했습니다. 인생 홍삼이에요 응어이 응어응어',
    '호랑이 기운이 솟아나요!!',
    '홍삼이 이렇게 달아도 되나요? 설탕 넣었나',
    '그냥 그래요.. 다크써클만 늘었어요',
    '진짜 약빨이 엄청나서 어제 몸져누웠다가 한입 먹고 원기충전 제대로 했습니다. 인생 홍삼이에요 응어이 응어응어',
    '호랑이 기운이 솟아나요!!',
    '홍삼이 이렇게 달아도 되나요? 설탕 넣었나',
    '그냥 그래요.. 다크써클만 늘었어요',
    '진짜 약빨이 엄청나서 어제 몸져누웠다가 한입 먹고 원기충전 제대로 했습니다. 인생 홍삼이에요 응어이 응어응어',
    '호랑이 기운이 솟아나요!!',
  ];
  const periodSamples = ['1개월 이하', '3개월 이상', '6개월 이상', '1년 이상'];
  // 샘플 리뷰 잔뜩 생성
  for (let i = 0; i < 50; i += 1) {
    const userId = 5 + i;
    reviews.push({
      userId,
      productId: 1,
      content: `${i}. 진짜 약빨이 엄청나서 어제 몸져누웠다가 한입 먹고 원기충전 제대로 했습니다. 인생 홍삼이에요 응어이 응어응어`,
      period: '1개월 이하',
      score: 3,
    });
  }

  return Review.bulkCreate(reviews);
};
