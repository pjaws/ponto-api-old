const app = require('../../src/app');

describe('\'productVariants\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-variants');
    expect(service).toBeTruthy();
  });
});
