const client = require('../client')
const saveUser = async (req) => {
  const { firstName, lastName, playerPhoneNumber, registrantEmail, playerAddressStreet, playerAddressCity, playerAddressZip, usLacrosseNumber, playerPostion, highSchool, expLevel, parentFirstName, parentLastName, parentPhoneNumber, parentEmail, parentAddressStreet, parentAddressCity, parentAddressZip, tournament } = req
  const query = `INSERT INTO public.registrations(player_first, player_last, player_phone, player_email, player_street, player_city, player_zip, player_us_lacrosse, player_position, player_school, player_experiance, parent_first, parent_last, parent_phone, parent_email, parent_street, parent_city, parent_zip, which_event)VALUES ('${firstName}', '${lastName}', '${playerPhoneNumber}', '${registrantEmail}', '${playerAddressStreet}', '${playerAddressCity}', '${playerAddressZip}', '${usLacrosseNumber}', '${playerPostion}', '${highSchool}', '${expLevel}', '${parentFirstName}', '${parentLastName}', '${parentPhoneNumber}', '${parentEmail}', '${parentAddressStreet}', '${parentAddressCity}', '${parentAddressZip}', '${tournament}');`
  console.log(query)
  try {
    client.connection.query(query)
  } catch (error) {
    return error
  }
}

module.exports.saveUser = saveUser
