const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');

const schema = {
  include: [
    {
      service: 'product-variants',
      nameAs: 'variants',
      parentField: 'id',
      childField: 'productId',
    },
    {
      service: 'product-images',
      nameAs: 'images',
      parentField: 'id',
      childField: 'productId',
    },
    {
      service: 'product-options',
      nameAs: 'options',
      parentField: 'id',
      childField: 'productId',
    },
  ],
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
    find: [populate({ schema })],
    get: [populate({ schema })],
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
