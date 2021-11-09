const { Model } = require('sequelize');
const debug = require('debug')('app:db');
const { createHash } = require('crypto');
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
      delete jsonUser.uuid;
      return jsonUser;
    }

    summary() {
      return {
        id: this.id,
        email: this.email,
        verified: this.verified,
        createdAt: this.createdAt,
      };
    }

    isRight(password) {
      const password2 = createHash('sha512')
        .update(password + process.env.SECRET_SALT).digest('base64');
      return this.password === password2;
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
          if (image) return `${process.env.CDN_SERVER}/${image}`;
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
          this.setDataValue('password', createHash('sha512').update(value + process.env.SECRET_SALT).digest('base64'));
        },
        defaultValue: '',
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      updatedAt: false,
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
