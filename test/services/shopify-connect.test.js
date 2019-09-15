const app = require('../../src/app');

describe('\'shopify-connect\' service', () => {
  it('registered the service', () => {
    const service = app.service('shopify-connect');
    expect(service).toBeTruthy();
  });
});
