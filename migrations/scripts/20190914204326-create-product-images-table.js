'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_images', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      position: { type: Sequelize.INTEGER, allowNull: false },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      src: { type: Sequelize.STRING, allowNull: false },
      width: Sequelize.INTEGER,
      height: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('product_variants');
  },
};
