const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SEND_GRID_API_KEY)
const sender = process.env.SENDER

const joi = require('@hapi/joi')
const boom = require('@hapi/boom')

const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    registrantEmail: joi.string().email().required()
})

const sendRegistrationEmail = async (req, res) => {
    const { body: { firstName, lastName, registrantEmail } } = req
    try {
        await schema.validateAsync(req.body)
    } catch (error) {
        const { output } = boom.badData()
        res.send(output)
    }
    const msg = {
        to: 'swdeveloper@jarrydstamatelos.com',
        from: sender,
        subject: 'New Registration Request',
        html: `Name: ${firstName} ${lastName}, ${registrantEmail} wants to register for Wasatch LC`
    }
    sendgrid.send(msg)
}

const req = {
    body: {
        firstName: 'Alistair',
        lastName: 'Beckett',
        registrantEmail: 'aMadeUpEmailAddress@test.com'
    }
}

sendRegistrationEmail(req)
// module.exports = {
//     sendRegistrationEmail
// }


