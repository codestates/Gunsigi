const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

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
      },
      uuid: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      profileImage: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        async set(value) {
          this.setDataValue('password', await bcrypt.hash(value, 10));
        },
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
    },
  );
  return User;
};
