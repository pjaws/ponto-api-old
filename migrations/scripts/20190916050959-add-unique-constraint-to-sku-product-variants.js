'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.addIndex('product_variants', {
      fields: ['userId', 'sku'],
      name: 'uniqueSkuPerUser',
      unique: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeIndex('product_variants', {
      fields: ['userId', 'sku'],
    });
  },
};
