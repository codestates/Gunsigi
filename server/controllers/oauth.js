const axios = require('axios');
const debug = require('debug')('app:oauth');
const {
  User, sequelize, Review, Bookmark, reviewLike, Sequelize, Product,
} = require('../models');
const s3 = require('../modules/image');
const {
  generateAccessToken,
  generateRefreshToken,
  sendToCookie,
} = require('../modules/token');

module.exports = {
  kakao: async (req, res) => {
    const kakaoToken = req.body.accessToken;

    // 유저정보 로딩, 가져올수있으면
    let userInfo;
    try {
      userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${kakaoToken}` },
      });
    } catch {
      return res.status(403).json({ message: 'Fail to kakao login' });
    }
    userInfo = userInfo.data;

    let user;
    let created;
    try {
      [user, created] = await User.findOrCreate({
        where: { uuid: userInfo.id },
        defaults: {
          email: userInfo.kakao_account?.email,
          nickname: userInfo.kakao_account.profile.nickname,
          type: 'kakao',
          uuid: userInfo.id,
          verified: true,
        },
      });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(403).json({ message: 'This email is already in use' });
      }
      return res.status(400).json({ message: 'Fail to kakao login' });
    }

    if (created && userInfo.kakao_account.profile?.thumbnail_image_url) {
      // 신규 가입유저 사진저장
      const image = await axios.get(userInfo.kakao_account.profile?.thumbnail_image_url,
        { responseType: 'arraybuffer' })
        .then((response) => Buffer.from(response.data, 'binary').toString('base64'))
        .then((img) => `data:image/jpeg;base64,${img}`);

      user.profileImage = await s3.save('profile', image);
      user.save();
    }

    // 가입 or 로그인 완료 토큰 생성
    const accessToken = generateAccessToken(user.json());
    sendToCookie(res, generateRefreshToken(user.json()));
    return res.json({
      message: 'Success to login',
      accessToken,
      userInfo: user.json(),
    });
  },

  google: async (req, res) => {
    let result;
    try {
      // Token 검증
      result = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.body.idToken}`);
    } catch {
      return res.status(400).json({ message: 'invalid id token' });
    }
    const googleUser = result.data;
    let user;
    let created;
    try {
      [user, created] = await User.findOrCreate({
        where: { uuid: googleUser.sub },
        defaults: {
          email: googleUser.email, nickname: googleUser.name, type: 'google', uuid: googleUser.sub, verified: true,
        },
      });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(403).json({ message: 'This email is already in use' });
      }
      return res.status(400).json({ message: 'invalid id token' });
    }
    if (created && googleUser.picture) {
      // 신규가입자. 프로필사진이 있는지 확인후 저장해서 DB에 입력한다.
      const image = await axios.get(googleUser.picture, { responseType: 'arraybuffer' })
        .then((response) => Buffer.from(response.data, 'binary').toString('base64'))
        .then((img) => `data:image/jpeg;base64,${img}`);
      user.profileImage = await s3.save('profile', image);
      user.save();
    }
    // 가입 or 로그인 완료 토큰 생성
    const accessToken = generateAccessToken(user.json());
    sendToCookie(res, generateRefreshToken(user.json()));
    return res.json({
      message: 'Success to login',
      accessToken,
      userInfo: user.json(),
    });
  },
  kakaoDelete: async (req, res) => {
    // 헤더 KAKAO_ADMIN_KEY 확인
    try {
      const adminKey = req.headers.authorization.split(' ')[1];
      if (adminKey !== process.env.KAKAO_ADMIN_KEY) throw Error('not match kakao admin key');
    } catch {
      return res.status(403).send('invalid admin key');
    }

    const user = await User.findOne({
      where: { uuid: req.query.user_id },
      include: [{ model: Review }, { model: Bookmark }, { model: reviewLike }],
    });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid Token',
      });
    }

    // 삭제 커밋이 확실하게 수행되고 나서 프로필 이미지를 삭제하기 위해 트랜잭션생성
    // 프로필 이미지 삭제 훅은 모델파일에 정의
    const transaction = await sequelize.transaction();
    try {
      await Promise.all([
        // 리뷰수 감소
        Product.decrement('reviewsCount', {
          by: 1,
          where: { id: { [Sequelize.Op.in]: user.Reviews.map((r) => r.productId) } },
          transaction,
        }),
        // 북마크 감소
        Product.decrement('bookmarksCount', {
          by: 1,
          where: { id: { [Sequelize.Op.in]: user.Bookmarks.map((r) => r.productId) } },
          transaction,
        }),
        // 리뷰에 좋아요 수 감소
        Review.decrement('likesCount', {
          by: 1,
          where: { id: { [Sequelize.Op.in]: user.reviewLikes.map((r) => r.reviewId) } },
          transaction,
        }),
        // 리뷰 점수 감소
      ].concat(Promise.all(user.Reviews.map((review) => Product.decrement('reviewsSum', {
        by: review.score,
        where: { id: review.productId },
        transaction,
      })))));

      await user.destroy({ transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      debug(err);
      throw err;
    }

    return res.send('success');
  },
};
