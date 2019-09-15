const app = require('../../src/app');

describe('\'shopify-connect-callback\' service', () => {
  it('registered the service', () => {
    const service = app.service('shopify-connect/callback');
    expect(service).toBeTruthy();
  });
});
