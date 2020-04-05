const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SEND_GRID_API_KEY)
const sender = process.env.SENDER
const subject = process.env.SUBJECT
const staff = 'swdeveloper@jarrydstamatelos.com'
// const staff0 = staff.split('|')[0]
// const staff1 = staff.split('|')[1]
// const staff2 = staff.split('|')[2]

const joi = require('@hapi/joi')
// const boom = require('@hapi/boom')

const schema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  registrantEmail: joi.string().email().required(),
  tournament: joi.string().required(),
  playerPhoneNumber: joi.string(),
  playerAddressStreet: joi.string().required(),
  playerAddressCity: joi.string().required(),
  playerAddressZip: joi.string().required(),
  usLacrosseNumber: joi.string().required(),
  playerPostion: joi.string().required(),
  teamSelection: joi.string().required(),
  graduationYear: joi.string().required(),
  expLevel: joi.string().required(),
  highSchool: joi.string().required(),
  parentFirstName: joi.string().required(),
  parentLastName: joi.string().required(),
  parentEmail: joi.string().email().required(),
  parentPhoneNumber: joi.string().required(),
  parentAddressStreet: joi.string(),
  parentAddressCity: joi.string(),
  parentAddressZip: joi.string()
})

const sendRegistrationEmail = async (req) => {
  const msg = {
    to: staff,
    from: sender,
    subject: subject,
    html: buildBody(req)
  }
  sendgrid.send(msg)
//   const isValid = await schema.validateAsync(req.body)
//   if (isValid) {
//     const msg = {
//       to: staff,
//       from: sender,
//       subject: subject,
//       html: buildBody(req)
//     }
//     sendgrid.send(msg)
//   } else {
//     const { output } = boom.badData()
//     throw output
//   }
}

const buildBody = (req) => {
  const { body } = req
  return `Player: ${body.firstName} ${body.lastName} \n` +
        `Player Email: ${body.registrantEmail} \n` +
        `Player Phone: ${body.playerPhoneNumber} \n` +
        `Tournamemt: ${body.tournament} \n` +
        `Player Address Street: ${body.playerAddressStreet} \n` +
        `Player Address City: ${body.playerAddressCity} \n` +
        `Player Address Zip: ${body.playerAddressZip} \n` +
        `Player US Lacrosse Number: ${body.usLacrosseNumber} \n` +
        `Player Position: ${body.playerPostion} \n` +
        `Player Team: ${body.teamSelection} \n` +
        `Player Grad Year: ${body.graduationYear} \n` +
        `Player Experiance Level: ${body.expLevel} \n` +
        `Player High School: ${body.highSchool} \n` +
        `Parent Name: ${body.parentFirstName} ${body.parentLastName} \n` +
        `Parent Phone Number: ${body.parentPhoneNumber} \n` +
        `Parent Address Street: ${body.parentAddressStreet} \n` +
        `Parent Address City: ${body.parentAddressCity} \n` +
        `Parent Address Zip: ${body.parentAddressZip} \n`
}

module.exports = {
  sendRegistrationEmail,
  buildBody // for testing
}
