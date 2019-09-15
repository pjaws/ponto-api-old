const app = require('../../src/app');

describe('\'shopifyConnections\' service', () => {
  it('registered the service', () => {
    const service = app.service('shopify-connections');
    expect(service).toBeTruthy();
  });
});
