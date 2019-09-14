const app = require('../../src/app');

describe('\'productOptions\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-options');
    expect(service).toBeTruthy();
  });
});
