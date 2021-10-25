const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, { through: 'ProductTag' });
    }
  }
  Tag.init(
    {
      tag: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tag',
      createdAt: false,
      updatedAt: false,
    },
  );
  return Tag;
};
