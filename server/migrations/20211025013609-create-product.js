'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      validNumber: {
        type: Sequelize.STRING
      },
      functional: {
        type: Sequelize.TEXT
      },
      expiration: {
        type: Sequelize.STRING
      },
      howToEat: {
        type: Sequelize.TEXT
      },
      shape: {
        type: Sequelize.STRING
      },
      standard: {
        type: Sequelize.TEXT
      },
      warning: {
        type: Sequelize.TEXT
      },
      bookmarksCount: {
        type: Sequelize.INTEGER
      },
      reviewsCount: {
        type: Sequelize.INTEGER
      },
      reviewsSum: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};