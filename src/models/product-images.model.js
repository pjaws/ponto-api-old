// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const productImages = sequelizeClient.define(
    'product_images',
    {
      shopifyId: { type: DataTypes.BIGINT, unique: true },
      position: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      src: { type: DataTypes.STRING, allowNull: false },
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
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
  productImages.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    productImages.belongsTo(models.products);
    productImages.belongsTo(models.users);
  };

  return productImages;
};
