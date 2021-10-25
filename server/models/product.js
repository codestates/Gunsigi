const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.Review, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Bookmark, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      });
      this.belongsToMany(models.Tag, { through: 'ProductTag' });
      this.belongsToMany(models.Ingredient, { through: 'ProductIngredient' });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      company: DataTypes.STRING,
      image: DataTypes.STRING,
      validNumber: DataTypes.STRING,
      functional: DataTypes.TEXT,
      expiration: DataTypes.STRING,
      howToEat: DataTypes.TEXT,
      shape: DataTypes.TEXT,
      standard: DataTypes.TEXT,
      warning: DataTypes.TEXT,
      bookmarksCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      reviewsCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      reviewsSum: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
