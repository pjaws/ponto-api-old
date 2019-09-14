const users = require('./users/users.service.js');
const products = require('./products/products.service.js');
const productVariants = require('./product-variants/product-variants.service.js');
const productImages = require('./product-images/product-images.service.js');
const productOptions = require('./product-options/product-options.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(products);
  app.configure(productVariants);
  app.configure(productImages);
  app.configure(productOptions);
};
