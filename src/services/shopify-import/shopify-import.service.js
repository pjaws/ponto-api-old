// Initializes the `shopify-import` service on path `/shopify-import`
const { ShopifyImport } = require('./shopify-import.class');
const hooks = require('./shopify-import.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/shopify-import', new ShopifyImport(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('shopify-import');

  service.hooks(hooks);
};
