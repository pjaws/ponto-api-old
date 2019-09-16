/* eslint-disable no-unused-vars */
const {
  BadRequest,
  GeneralError,
  NotAuthenticated,
} = require('@feathersjs/errors');
const ShopifyToken = require('shopify-token');
const logger = require('../../logger');

exports.ShopifyConnect = class ShopifyConnect {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find(params) {
    const shop = params.query.shop;

    if (!shop) throw new BadRequest('Missing shop parameter.');

    const shopifyToken = new ShopifyToken({
      ...this.app.get('shopify'),
    });

    // must generate this unique key, which will be passed back to us by shopify in the callback
    const nonce = shopifyToken.generateNonce();

    const authUrl = shopifyToken.generateAuthUrl(
      shop,
      this.app.get('shopify').scopes,
      nonce,
    );

    try {
      // persist nonce to the db along with userId for retrieval in the callback
      await this.app.service('shopify-connections').create({
        nonce,
        userId: params.user.id,
      });
    } catch (err) {
      logger.warn(err);
      throw new GeneralError('Error creating shopify connection.');
    }

    return { authUrl };
  }

  async get(id, params) {
    if (id === 'callback') {
      const shopifyToken = new ShopifyToken({
        ...this.app.get('shopify'), // get api key, secret, etc. from current config
      });

      const ok = shopifyToken.verifyHmac(params.query);

      if (!ok) throw new NotAuthenticated('Error verifying Shopify callback.');

      try {
        const accessTokenResponse = await shopifyToken.getAccessToken(
          params.query.shop,
          params.query.code,
        );

        // find the user based on the nonce we set in the initial connection request
        const shopifyConnections = await this.app
          .service('shopify-connections')
          .find({
            query: {
              nonce: params.query.state,
            },
          });

        const userId = shopifyConnections.data[0].userId;

        const user = await this.app.service('users').patch(userId, {
          shopifyAccessToken: accessTokenResponse.access_token,
          shopifyShopName: params.query.shop,
        });

        const job = await this.app.service('shopify-import').create({
          userId: user.id,
          accessToken: user.shopifyAccessToken,
          shopName: user.shopifyShopName,
        });

        return job;
      } catch (err) {
        logger.warn(err);
        throw new GeneralError(err);
      }
    }

    return {};
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
