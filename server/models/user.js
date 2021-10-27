const { Model } = require('sequelize');

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
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      uuid: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
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
    },
  );
  return User;
};
