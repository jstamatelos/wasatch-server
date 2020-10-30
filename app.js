const express = require('express')
const cors = require('cors')
const { isValid } = require('./routes/util')

const port = process.env.PORT || 3000
const pino = require('express-pino-logger')()
const { saveUser } = require('./routes/saveUser')
// const { sendRegistrationEmail } = require('./routes/sendMail')

const app = express()
app.use(express.json())
app.use(pino)

app.use(cors())

app.get('/', function (req, res) {
  req.log.info('get () :: attempting to open connection to server...')
  res.send(JSON.stringify({ Status: 'Running' }))
})

app.post('/register', async (req, res) => {
  req.log.info('register() :: attempting to create registration...')
  try {
    req.log.info('register() :: attempt to validate request registration was succesfull')

    await isValid(req)
    // await sendRegistrationEmail(req)
    saveUser(req.body)
    req.log.info('register() :: attempt to create registration was succesfull')
    const successObj = { status: 'success' }
    res.send(successObj)
  } catch (error) {
    req.log.error('register() :: error during registration attempt', error.message)
    req.log.error('register() :: error during registration attempt', error.details)

    res.status(400).send(error)
  }
})

app.listen(port, function () {
  console.log(`Up and running on port: ${port}`)
})
