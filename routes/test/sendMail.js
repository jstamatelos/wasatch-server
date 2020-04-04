const test = require('tape')
const modulePath = '../sendMail'
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const res = {
    send: sinon.stub()
}
const mailMock = {
    setApiKey: sinon.stub(),
    send: sinon.stub()
}
const lib = proxyquire(modulePath, {
    '@sendgrid/mail': mailMock
})

test('sendRegistrationEmail() validation fails', async (assert) => {

    const req = {
        body: {
            lastName: 'last',
            registrantEmail: 'email@test.com'
        }
    }
    await lib.sendRegistrationEmail(req, res)
    assert.true(res.send.calledOnce, 'res called')
    assert.deepEquals(res.send.args[0], [ { statusCode: 422, payload: { statusCode: 422, error: 'Unprocessable Entity', message: 'Unprocessable Entity' }, headers: {} } ])
    
    assert.end()
})

test('sendRegistrationEmail() validation passes', async (assert) => {
    const req = {
        body: {
            firstName: 'first',
            lastName: 'last',
            registrantEmail: 'email@test.com'
        }
    }
    lib.sendRegistrationEmail(req, res)

    assert.true(mailMock.setApiKey.calledOnce, 'api key set')
    
    assert.end()
})

test('buildBody() validation passes', async (assert) => {
    const { buildBody } = require(modulePath)
    const req = {
        body: {
            firstName: 'first',
            lastName: 'last',
            registrantEmail: 'email@test.com'
        }
    }
    const actual = buildBody(req)
    assert.ok(actual)
    
    assert.end()
})