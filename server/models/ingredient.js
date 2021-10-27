const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, { through: models.ProductIngredients });
    }
  }
  Ingredient.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      good: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      bad: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'Ingredient',
      createdAt: false,
      updatedAt: false,
    },
  );
  return Ingredient;
};
