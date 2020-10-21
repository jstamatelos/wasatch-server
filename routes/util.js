const joi = require('@hapi/joi')

const schema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  registrantEmail: joi
    .string()
    .email()
    .required(),
  tournament: joi.string().required(),
  playerPhoneNumber: joi.string(),
  playerAddressStreet: joi.string().required(),
  playerAddressCity: joi.string().required(),
  playerAddressZip: joi.string().required(),
  usLacrosseNumber: joi.string().required(),
  playerPostion: joi.string().required(),
  graduationYear: joi.string().required(),
  expLevel: joi.string().required(),
  highSchool: joi.string().required(),
  parentFirstName: joi.string().required(),
  parentLastName: joi.string().required(),
  parentEmail: joi
    .string()
    .email()
    .required(),
  parentPhoneNumber: joi.string().required(),
  parentAddressStreet: joi.string(),
  parentAddressCity: joi.string(),
  parentAddressZip: joi.string(),
  agreement: joi.boolean().valid(true)
})

const isValid = async (req) => {
  await schema.validateAsync(req.body)
}

module.exports.isValid = isValid
