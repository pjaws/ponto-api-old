'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'product_variants',
          'shopifyId',
          {
            type: Sequelize.BIGINT,
            unique: true,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'product_images',
          'shopifyId',
          {
            type: Sequelize.BIGINT,
            unique: true,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'product_options',
          'shopifyId',
          {
            type: Sequelize.BIGINT,
            unique: true,
          },
          { transaction: t },
        ),
      ]);
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('product_variants', 'shopifyId', {
          transaction: t,
        }),
        queryInterface.removeColumn('product_images', 'shopifyId', {
          transaction: t,
        }),
        queryInterface.removeColumn('product_options', 'shopifyId', {
          transaction: t,
        }),
      ]);
    });
  },
};
