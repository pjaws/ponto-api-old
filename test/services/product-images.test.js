const app = require('../../src/app');

describe('\'productImages\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-images');
    expect(service).toBeTruthy();
  });
});
