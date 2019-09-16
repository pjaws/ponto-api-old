const app = require('../../src/app');

describe('\'shopify-import\' service', () => {
  it('registered the service', () => {
    const service = app.service('shopify-import');
    expect(service).toBeTruthy();
  });
});
