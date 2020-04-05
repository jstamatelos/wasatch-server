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

    assert.true(mailMock.setApiKey.calledOnce, 'api key set')
    assert.true(mailMock.send.notCalled, 'send not called')

    assert.end()
})

test('sendRegistrationEmail() validation passes', async (assert) => {
    const req = {
        body: {
            firstName: 'test',
            lastName: 'test',
            registrantEmail: 'test@test.com',
            tournamemt: 'test',
            playerPhoneNumber: 'test',
            playerAddressStreet: 'test',
            playerAddressCity: 'test',
            playerAddressZip: 'test',
            usLacrosseNumber: 'test',
            playerPostion: 'test',
            teamSelection: 'test',
            graduationYear: 'test',
            experianceLevel: 'test',
            highSchool: 'test',
            parentFirstName: 'test',
            parentLastName: 'test',
            parentEmail: 'testparentEmail@test.com',
            parentPhoneNumber: 'test',
            parentAddressStreet: 'test',
            parentAddressCity: 'test',
            parentAddressZip: 'test'
        }
    }
    await lib.sendRegistrationEmail(req, res)

    assert.true(mailMock.setApiKey.calledOnce, 'api key set')
    assert.true(mailMock.send.calledOnce, 'sendGrid send called once')

    assert.end()
})

test('buildBody() validation passes', async (assert) => {
    const { buildBody } = require(modulePath)
    const req = {
        body: {
            firstName: 'test',
            lastName: 'test',
            registrantEmail: 'test@test.com',
            tournamemt: 'test',
            playerPhoneNumber: 'test',
            playerAddressStreet: 'test',
            playerAddressCity: 'test',
            playerAddressZip: 'test',
            usLacrosseNumber: 'test',
            playerPostion: 'test',
            teamSelection: 'test',
            graduationYear: 'test',
            experianceLevel: 'test',
            highSchool: 'test',
            parentFirstName: 'test',
            parentLastName: 'test',
            parentEmail: 'testparentEmail@test.com',
            parentPhoneNumber: 'test',
            parentAddressStreet: 'test',
            parentAddressCity: 'test',
            parentAddressZip: 'test'
        }
    }
    const actual = buildBody(req)
    console.log(actual)
    assert.ok(actual)
    
    assert.end()
})