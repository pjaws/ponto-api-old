const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');

const productVariantsSchema = {
  include: {
    service: 'product_variants',
    nameAs: 'variants',
    parentField: 'productId',
    childField: 'id',
  },
};
const productImagesSchema = {
  include: {
    service: 'product_images',
    nameAs: 'images',
    parentField: 'productId',
    childField: 'id',
  },
};
const productOptionsSchema = {
  include: {
    service: 'product_options',
    nameAs: 'options',
    parentField: 'productId',
    childField: 'id',
  },
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [
      populate({ schema: productVariantsSchema }),
      populate({ schema: productImagesSchema }),
      populate({ schema: productOptionsSchema }),
    ],
    get: [
      populate({ schema: productVariantsSchema }),
      populate({ schema: productImagesSchema }),
      populate({ schema: productOptionsSchema }),
    ],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
