const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reviewLike extends Model {
    static associate(models) {
      this.belongsTo(models.Review, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  reviewLike.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'reviewLike',
      createdAt: false,
      updatedAt: false,
    },
  );
  return reviewLike;
};
