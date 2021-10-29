const { Model } = require('sequelize');
const path = require('path');

module.exports = (sequelize, DataTypes) => {
  class reviewImage extends Model {
    static associate(models) {
      this.belongsTo(models.Review, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return this.image;
    }
  }
  reviewImage.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const image = this.getDataValue('image');
          if (image) return path.join(process.env.CDN_SERVER, image);
          return '';
        },
      },
    },
    {
      sequelize,
      modelName: 'reviewImage',
      createdAt: false,
      updatedAt: false,
    },
  );
  return reviewImage;
};
