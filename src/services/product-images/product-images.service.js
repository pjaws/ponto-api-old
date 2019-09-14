// Initializes the `productImages` service on path `/product-images`
const { ProductImages } = require('./product-images.class');
const createModel = require('../../models/product-images.model');
const hooks = require('./product-images.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/product-images', new ProductImages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-images');

  service.hooks(hooks);
};
