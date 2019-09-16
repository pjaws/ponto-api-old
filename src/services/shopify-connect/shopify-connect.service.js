// Initializes the `shopify-connect` service on path `/shopify-connect`
const { ShopifyConnect } = require('./shopify-connect.class');
const hooks = require('./shopify-connect.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate,
  };

  // Initialize our service with any options it requires
  app.use(
    '/shopify-connect',
    new ShopifyConnect(options, app),
    (req, res, next) => {
      console.log('params');
      console.log(req.params);
      if (req.params.__feathersId === 'callback') {
        res.redirect(`http://${app.get('ui').baseUrl}/app/products`);
      }

      next();
    },
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('shopify-connect');

  service.hooks(hooks);
};
