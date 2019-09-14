// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const productOptions = sequelizeClient.define(
    'product_options',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      values: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line no-unused-vars
  productOptions.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    productOptions.belongsTo(models.products);
  };

  return productOptions;
};
