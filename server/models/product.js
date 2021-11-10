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
      this.belongsToMany(models.Ingredient, {
        through: models.ProductIngredients,
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      company: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        get() {
          const image = this.getDataValue('image');
          if (image) return `${process.env.CDN_SERVER}/${image}`;
          return '';
        },
      },
      validNumber: DataTypes.STRING,
      functional: DataTypes.TEXT,
      expiration: DataTypes.STRING,
      howToEat: DataTypes.TEXT,
      shape: DataTypes.TEXT,
      standard: DataTypes.TEXT,
      warning: DataTypes.TEXT,
      bookmarksCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      reviewsCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      reviewsSum: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      views: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      updatedAt: false,
      indexes: [
        {
          fields: ['views'],
        },
        {
          fields: ['reviewsCount'],
        },
      ],
    },
  );
  return Product;
};
