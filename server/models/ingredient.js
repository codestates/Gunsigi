const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, { through: 'ProductIngredient' });
    }
  }
  Ingredient.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      functional: DataTypes.TEXT,
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
