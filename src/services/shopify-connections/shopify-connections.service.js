// Initializes the `shopifyConnections` service on path `/shopify-connections`
const { ShopifyConnections } = require('./shopify-connections.class');
const createModel = require('../../models/shopify-connections.model');
const hooks = require('./shopify-connections.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/shopify-connections', new ShopifyConnections(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('shopify-connections');

  service.hooks(hooks);
};
