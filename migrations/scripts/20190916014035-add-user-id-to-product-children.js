'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'product_variants',
          'userId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            allowNull: false,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'product_images',
          'userId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            allowNull: false,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'product_options',
          'userId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            allowNull: false,
          },
          { transaction: t },
        ),
      ]);
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('product_variants', 'userId', {
          transaction: t,
        }),
        queryInterface.removeColumn('product_images', 'userId', {
          transaction: t,
        }),
        queryInterface.removeColumn('product_options', 'userId', {
          transaction: t,
        }),
      ]);
    });
  },
};
