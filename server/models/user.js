const { Model } = require('sequelize');
const debug = require('debug')('app:db');
const bcrypt = require('bcrypt');
const path = require('path');
const s3 = require('../modules/image');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Bookmark, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.reviewLike, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }

    json() {
      const jsonUser = this.toJSON();
      delete jsonUser.password;
      return jsonUser;
    }

    async isRight(password) {
      const check = await bcrypt.compare(password, this.password);
      return check;
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      uuid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        defaultValue: '',
        get() {
          const image = this.getDataValue('profileImage');
          if (image) return path.join(process.env.CDN_SERVER, image);
          return '';
        },
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
        defaultValue: '',
      },
      type: {
        type: DataTypes.ENUM,
        values: ['email', 'kakao', 'google'],
      },
      reviewsCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      bookmarksCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        afterDestroy: async (user, options) => {
          if (options.transaction) {
            options.transaction.afterCommit(async () => {
              debug('회원탈퇴 커밋 완료. 이미지 삭제시작');
              const image = user.getDataValue('profileImage');
              if (image) {
                await s3.delete(image);
              }
            });
          }
        },
      },
    },
  );
  return User;
};
