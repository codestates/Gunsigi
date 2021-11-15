const request = require('supertest');
const app = require('../app');

const productId = 1551;
let userId;
const sampleUser = {
  email: 'testusersample@naver.com',
  nickname: 'testUser',
  password: '123123',
  type: 'email',
};

afterAll(async () => {
  await app.db.User.destroy({ where: { email: sampleUser.email } });
  await app.redis.quit();
});

beforeAll(async () => {
  // 회원가입
  await request(app)
    .post('/auth/signup')
    .send(sampleUser)
    .then((res) => {
      global.header = {
        Authorization: `Bearer ${res.body.accessToken}`,
      };
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('userInfo');
      expect(res.body.userInfo).toHaveProperty('id');
      userId = res.body.userInfo.id;
    });
});

describe('Default', () => {
  test('GET /', async () => {
    await request(app).get('/').expect(200);
    await request(app).get('/healthcheck').expect(200);
    await request(app).get('/test').expect(200);
  });
});

describe('인증 및 유저', () => {
  test('/auth/signin 로그인', async () => {
    await request(app).post('/auth/signin').send(sampleUser)
      .expect(200)
      .then((res) => {
        expect(res.body.accessToken).not.toBeNull();
        expect(res.body).toHaveProperty('userInfo');
        expect(res.body).toHaveProperty('message');
        expect(res.body.userInfo).toHaveProperty('id');
      });
  });

  test('/auth/overlap 이메일 중복확인', async () => {
    await request(app).get('/auth/overlap').query({ email: sampleUser.email, password: sampleUser.password })
      .expect(200)
      .then((res) => {
        expect(res.body.result).not.toBeTruthy();
      });
    await request(app)
      .get('/auth/overlap')
      .query({ email: `${sampleUser.email}c`, password: sampleUser.password })
      .expect(200)
      .then((res) => {
        expect(res.body.result).toBeTruthy();
      });
  });

  test('/users 회원정보 수정', async () => {
    await request(app)
      .patch('/users')
      .set(global.header)
      .send({ nickname: 'test', password: '1231212' })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('userInfo');
        expect(res.body.userInfo).toHaveProperty('nickname');
        expect(res.body.userInfo.nickname).toBe('test');
      });
  });

  test('/users 회원정보 조회', async () => {
    await request(app)
      .get('/users')
      .set(global.header)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('userInfo');
        expect(res.body.userInfo).toHaveProperty('nickname');
        expect(res.body.userInfo).toHaveProperty('id');
      });
  });
});

describe('제품 및 리뷰', () => {
  let bookmarksCount;
  let reviewsCount;
  let reviewId;
  describe('제품 API', () => {
    test('GET /products/:id 제품상세조회', async () => {
      await request(app).get(`/products/${productId}`).set(global.header)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('itemInfo');
          expect(res.body.itemInfo).toHaveProperty('score');
          expect(res.body.itemInfo).toHaveProperty('bookmarksCount');
          expect(res.body.itemInfo).toHaveProperty('reviewsCount');

          bookmarksCount = res.body.itemInfo.bookmarksCount;
          reviewsCount = res.body.itemInfo.reviewsCount;
        });
    });

    test('GET /products search 제품검색', async () => {
      await request(app).get('/products').set(global.header)
        .query({
          type: 'search', order: 'views', query: '유산균', page: 1, size: 40,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
        });
      await request(app)
        .get('/products')
        .set(global.header)
        .query({
          type: 'search',
          order: 'reviews',
          query: '유산균',
          page: 2,
          size: 40,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
        });
    });

    test('GET /products category 제품검색', async () => {
      await request(app)
        .get('/products')
        .set(global.header)
        .query({
          type: 'category',
          order: 'reviews',
          query: '유산균',
          page: 1,
          size: 40,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
        });
      await request(app)
        .get('/products')
        .set(global.header)
        .query({
          type: 'category',
          order: 'views',
          query: '유산균',
          page: 1,
          size: 40,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
        });
    });

    test('GET /products keyword 제품검색', async () => {
      await request(app)
        .get('/products')
        .set(global.header)
        .query({
          type: 'keyword',
          order: 'reviews',
          query: '프로폴리스',
          page: 1,
          size: 40,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
        });
      await request(app)
        .get('/products')
        .set(global.header)
        .query({
          type: 'keyword',
          order: 'views',
          query: '프로폴리스',
          page: 1,
          size: 40,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
        });
    });

    test('GET /products 제품전체리스트', async () => {
      await request(app)
        .get('/products/all/items')
        .set(global.header)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
        });
    });
  });

  describe('리뷰 API', () => {
    test('GET /reviews 내가쓴리뷰목록', async () => {
      await request(app)
        .get('/reviews')
        .set(global.header)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
        });
    });

    test('GET /reviews/:id 제품리뷰목록', async () => {
      await request(app)
        .get('/reviews/1')
        .set(global.header)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
          expect(res.body).toHaveProperty('pages');
          expect(res.body.pages).toHaveProperty('total');
          expect(res.body.pages).toHaveProperty('itemsCount');
        });
    });

    test('POST /reviews 리뷰작성', async () => {
      await request(app)
        .post('/reviews')
        .set(global.header)
        .send({
          productId, content: 'test review', period: '1개월 이하', score: 4,
        })
        .expect(200)
        .then(async (res) => {
          expect(res.body).toHaveProperty('review');
          expect(res.body.review).toHaveProperty('id');
          reviewId = res.body.review.id;
        });
      const product = await app.db.Product.findByPk(productId);
      expect(product.reviewsCount).toBe(reviewsCount + 1);
    });

    test('POST /review/like 리뷰에 좋아요', async () => {
      await request(app)
        .post('/review/like')
        .set(global.header)
        .send({ reviewId })
        .expect(200);
      const review = await app.db.Review.findByPk(reviewId);
      expect(review.likesCount).toBe(1);
    });

    test('DELETE /review/like 리뷰좋아요취소', async () => {
      await request(app)
        .delete('/review/like')
        .set(global.header)
        .send({ reviewId })
        .expect(200);
      const review = await app.db.Review.findByPk(reviewId);
      expect(review.likesCount).toBe(0);
    });

    test('DELETE /reviews 리뷰삭제', async () => {
      await request(app)
        .delete('/reviews')
        .set(global.header)
        .send({ reviewId })
        .expect(200);
      const review = await app.db.Review.findByPk(reviewId);
      const product = await app.db.Product.findByPk(productId);
      expect(review).toBeNull();
      expect(product.reviewsCount).toBe(reviewsCount);
    });
  });

  describe('북마크 API', () => {
    test('POST /bookmarks 북마크하기', async () => {
      await request(app)
        .post('/bookmarks')
        .set(global.header)
        .send({ productId })
        .expect(200);
      const product = await app.db.Product.findByPk(productId);
      expect(product.bookmarksCount).toBe(bookmarksCount + 1);
    });

    test('GET /bookmarks 북마크제품목록', async () => {
      await request(app)
        .get('/bookmarks')
        .set(global.header)
        .query({ page: 1, limit: '30' })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('items');
          expect(Array.isArray(res.body.items)).toBe(true);
          expect((res.body.items.filter((item) => item.id === productId)).length).toBe(1);
        });
    });

    test('DELETE /bookmarks 북마크삭제', async () => {
      await request(app)
        .delete('/bookmarks')
        .set(global.header)
        .send({ productId })
        .expect(200);
      const product = await app.db.Product.findByPk(productId);
      expect(product.bookmarksCount).toBe(bookmarksCount);
    });
  });

  describe('회원탈퇴', () => {
    test('DELTE /users 회원탈퇴', async () => {
      await request(app).delete('/users').set(global.header).expect(200);
      const user = await app.db.User.findByPk(userId);
      expect(user).toBeNull();
    });
  });
});
