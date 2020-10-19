const database = require('../client')
const Type = database.DataTypes

module.exports = database.define('registrations', {
  player_first: {
    type: Type.String
  },
  player_last: {
    type: Type.String
  },
  player_phone: {
    type: Type.String
  },
  player_email: {
    type: Type.String
  },
  player_street: {
    type: Type.String
  },
  player_city: {
    type: Type.String
  },
  player_zip: {
    type: Type.String
  },
  player_us_lacrosse: {
    type: Type.String
  },
  player_position: {
    type: Type.String
  },
  player_school: {
    type: Type.String
  },
  player_experiance: {
    type: Type.String
  },
  parent_first: {
    type: Type.String
  },
  parent_last: {
    type: Type.String
  },
  parent_phone: {
    type: Type.String
  },
  parent_email: {
    type: Type.String
  },
  parent_street: {
    type: Type.String
  },
  parent_city: {
    type: Type.String
  },
  parent_zip: {
    type: Type.String
  },
  event: {
    type: Type.String
  }
})
