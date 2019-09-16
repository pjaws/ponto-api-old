/* eslint-disable no-unused-vars */
const Shopify = require('shopify-api-node');
const Bull = require('bull');
const shopifyImportQueue = new Bull('shopify import');
const logger = require('../../logger');

shopifyImportQueue.on('completed', (job, result) => {
  console.log('Job completed with result: ', result);
});

exports.ShopifyImport = class ShopifyImport {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  mapShopifyProductAttributes(products, userId) {
    return products.map(product => ({
      userId,
      title: product.title,
      description: product.body_html,
      shopifyId: product.id,
      type: product.product_type,
      tags: [product.tags],
      vendor: product.vendor,
      variants: product.variants.map(variant => ({
        title: variant.title,
        sku: variant.sku,
        inventoryQuantity: variant.inventory_quantity,
        option1: variant.option1,
        option2: variant.option2,
        option3: variant.option3,
        price: variant.price,
        weight: variant.weight,
        weightUnit: variant.weight_unit,
      })),
      options: product.options.map(option => ({
        name: option.name,
      })),
      images: product.images.map(image => ({
        position: image.position,
        src: image.src,
        width: image.width,
        height: image.height,
      })),
    }));
  }

  /**
   *
   * @param {Array} children A nested resource of a product (variants, images, etc.)
   * @param {String} identifier A string identifying the type of resource ('variants', 'images')
   * @param {Number} productId
   */
  async createProductChildren(children, identifier, productId) {
    return children.map(async child => {
      const childWithId = { ...child, productId };
      try {
        const data = await this.app
          .service(`product-${identifier}`)
          .create(childWithId);
        return { status: 'success', data };
      } catch (err) {
        return { status: 'error', error: err, data: child };
      }
    });
  }

  async createProductsFromShopify(products, userId) {
    try {
      this.mapShopifyProductAttributes(products, userId).forEach(
        async product => {
          try {
            const savedProduct = await this.app
              .service('products')
              .create(product);

            await this.createProductChildren(
              product.variants,
              'variants',
              savedProduct.id,
            );
            await this.createProductChildren(
              product.images,
              'images',
              savedProduct.id,
            );
            await this.createProductChildren(
              product.options,
              'options',
              savedProduct.id,
            );

            return { status: 'Shopify Import Completed' };
          } catch (err) {
            logger.warn(err);
            return { status: 'Shopify Import Failed' };
          }
        },
      );
    } catch (err) {
      logger.warn(err);
      return { status: 'Shopify Import Failed' };
    }
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    const importJob = shopifyImportQueue.add(data);

    shopifyImportQueue.process(async job => {
      const shopify = new Shopify({
        shopName: job.data.shopName,
        accessToken: job.data.accessToken,
      });

      try {
        return await shopify.product
          .list({ limit: 250 })
          .then(async products => {
            return await this.createProductsFromShopify(
              products,
              job.data.userId,
            );
          });
      } catch (err) {
        logger.warn(err);
        return err;
      }
    });

    return importJob;
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
