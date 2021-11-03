const debug = require('debug')('app:db');
const { Model } = require('sequelize');
const s3 = require('../modules/image');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'userInfo',
      });
      this.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.reviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        as: 'images',
      });
      this.hasMany(models.reviewLike, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
      });
    }
  }
  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      likesCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      period: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
      updatedAt: false,
      indexes: [
        {
          fields: ['productId', 'period', 'createdAt'],
        },
        { fields: ['productId', 'period', 'likesCount'] },
      ],
      hooks: {
        afterDestroy: (review, options) => {
          if (options.transaction) {
            options.transaction.afterCommit(async () => {
              debug('리뷰 삭제 커밋 완료. 이미지 삭제시작');
              await s3.deleteFolder(`reviews/${review.id}`);
            });
          }
        },
      },
    },
  );
  return Review;
};
