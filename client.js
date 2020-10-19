const { Sequelize } = require('sequelize')

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      requre: true,
      rejectUnauthorized: false
    }
  },
  ssl: true
}

const connection = new Sequelize(options)
module.exports.connection = connection
module.exports.DataTypes = Sequelize.DataTypes

// This is to test getting the connection - be sure to set env vars
// const testConnection = async () => {
//   try {
//     await connection.authenticate();
//     console.log('Connection has been established successfully.')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// testConnection()
