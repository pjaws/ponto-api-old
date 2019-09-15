'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'shopifyShopName', {
      type: Sequelize.STRING,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'shopifyShopName');
  },
};
