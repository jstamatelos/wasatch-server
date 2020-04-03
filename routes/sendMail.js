const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SEND_GRID_API_KEY)
const sender = process.env.SENDER
const subject = process.env.SUBJECT
const staff = process.env.WASATCH_STAFF
const staff0 = staff.split('|')[0]
const staff1 = staff.split('|')[1]
const staff2 = staff.split('|')[2]

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
        console.error(output)
        res.send(output)
    }
    const msg = {
        to: [{
            email: staff0
        },{
            email: staff1
        },{
            email: staff2
        }],
        from: sender,
        subject: subject,
        html: `Name: ${firstName} ${lastName}, ${registrantEmail} wants to register for Wasatch LC`
    }
    
    sendgrid.send(msg)
}

module.exports = {
    sendRegistrationEmail
}


