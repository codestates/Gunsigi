const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reviewImage extends Model {
    static associate(models) {
      this.belongsTo(models.Review, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
      });
    }
  }
  reviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'reviewImage',
    createdAt: false,
    updatedAt: false,
  });
  return reviewImage;
};
