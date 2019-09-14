// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const products = sequelizeClient.define(
    'products',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      shopifyId: DataTypes.BIGINT,
      type: DataTypes.STRING,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      vendor: DataTypes.STRING,
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
  products.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    console.log('models', models);
    products.belongsTo(models.users);
    products.hasMany(models.product_variants);
    products.hasMany(models.product_images);
    products.hasMany(models.product_options);
  };

  return products;
};
