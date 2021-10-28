const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const path = require('path');

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
    },
  );
  return User;
};
