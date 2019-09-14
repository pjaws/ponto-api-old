// Initializes the `productVariants` service on path `/product-variants`
const { ProductVariants } = require('./product-variants.class');
const createModel = require('../../models/product-variants.model');
const hooks = require('./product-variants.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/product-variants', new ProductVariants(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-variants');

  service.hooks(hooks);
};
