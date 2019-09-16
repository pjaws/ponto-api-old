// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const productVariants = sequelizeClient.define(
    'product_variants',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sku: {
        type: DataTypes.STRING,
      },
      shopifyId: {
        type: DataTypes.BIGINT,
        unique: true,
      },
      inventoryQuantity: DataTypes.INTEGER,
      option1: DataTypes.STRING,
      option2: DataTypes.STRING,
      option3: DataTypes.STRING,
      price: DataTypes.DECIMAL(2),
      weight: DataTypes.INTEGER,
      weightUnit: DataTypes.ENUM(['g', 'kg', 'oz', 'lb']),
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
  productVariants.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    productVariants.belongsTo(models.products);
    productVariants.belongsTo(models.users);
  };

  return productVariants;
};
