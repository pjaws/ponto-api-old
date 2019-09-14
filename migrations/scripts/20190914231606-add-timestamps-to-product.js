'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'products',
          'createdAt',
          {
            type: Sequelize.DATE,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'products',
          'updatedAt',
          {
            type: Sequelize.DATE,
          },
          { transaction: t },
        ),
      ]);
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('products', 'createdAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('products', 'updatedAt', {
          transaction: t,
        }),
      ]);
    });
  },
};
