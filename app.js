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
// app.use(cors())
const corsOptions = {
  origin: 'https://jstamatelos.github.io'
}

app.get('/', cors(corsOptions), function (req, res) {
  res.send(JSON.stringify({ Status: 'Running' }))
})

app.post('/register', cors(corsOptions), async (req, res) => {
  req.log.info('register() :: attempting to create registration...')
  try {
    await isValid(req)
    // await sendRegistrationEmail(req)
    saveUser(req.body)
    req.log.info('register() :: attempt to create registration was succesfull')
    res.send(JSON.stringify({ Status: 'Success' }))
  } catch (error) {
    req.log.error('register() :: error during registration attempt', error.message)
    req.log.error('register() :: error during registration attempt', error.details)

    res.status(400).send()
  }
})

app.listen(port, function () {
  console.log(`Up and running on port: ${port}`)
})
