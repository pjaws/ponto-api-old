'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_variants', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        allowNull: false,
      },
      inventoryQuantity: Sequelize.INTEGER,
      option1: Sequelize.STRING,
      option2: Sequelize.STRING,
      option3: Sequelize.STRING,
      price: Sequelize.DECIMAL(2),
      weight: Sequelize.INTEGER,
      weightUnit: Sequelize.ENUM(['g', 'kg', 'oz', 'lb']),
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('product_variants');
  },
};
