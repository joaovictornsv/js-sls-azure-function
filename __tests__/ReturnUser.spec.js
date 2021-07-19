const { expect } = require('chai');
const sinon = require('sinon');
const { handler: getUserHandler } = require('../src/handlers/get-user');
const { api } = require('../src/utils/api');
const { contextMock } = require('./mocks/contextMock');
const { requestMock } = require('./mocks/requestMock');

describe('getUserHandler', () => {
  let sandbox;
  let apiMock;

  before(() => {
    sandbox = sinon.createSandbox();
    apiMock = sinon.stub(api, 'get');
    apiMock.returns({ data: 'mock-user-data' })
  })

  beforeEach(() => {
    sandbox.restore();
    requestMock.params = {}
  })

  it('should return a user', async () => {
    requestMock.params = { name: 'mock-name' };

    await getUserHandler(contextMock, requestMock);

    expect(contextMock.res).to.have.property('body').to.equal('mock-user-data');
  });

  it('should not return a user if name not provided', async () => {
    await getUserHandler(contextMock, requestMock);

    expect(contextMock.res.body).to.have.property('error').to.equal('Provide a username');
  });
});