'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_variants', 'sku', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('product_variants', 'sku', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
