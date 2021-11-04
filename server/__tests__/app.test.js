const request = require('supertest');
const app = require('../app');

const sampleUser = {
  email: 'testusersample@naver.com',
  nickname: 'testUser',
  password: '123123',
  type: 'email',
};

afterAll(async () => {
  await app.db.User.destroy({ where: { email: sampleUser.email } });
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
  describe('제품 API', () => {
    test('GET /products/:id', async () => {
      await request(app).get('/products/1').set(global.header)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('itemInfo');
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

  
});
