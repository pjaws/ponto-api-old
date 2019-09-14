// Initializes the `productOptions` service on path `/product-options`
const { ProductOptions } = require('./product-options.class');
const createModel = require('../../models/product-options.model');
const hooks = require('./product-options.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/product-options', new ProductOptions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-options');

  service.hooks(hooks);
};
