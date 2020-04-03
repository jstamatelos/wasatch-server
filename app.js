const express = require('express')
const port = process.env.PORT || 3000
const pino = require('./logger')
const { sendRegistrationEmail } = require('./routes/sendMail')

const app = express()
app.use(express.json())
app.use(pino)

app.get('/', function (req, res) {
    res.send(JSON.stringify({ Status: 'Running' }))
})

app.post('/register', async (req, res) => {
    req.log.info('register() :: attempting to create registration...')
    try {
        await sendRegistrationEmail(req, res)
        res.send('registration successfull posted')
    } catch (error) {
        req.log.error('register() :: error during registration attempt', error)
        res.send(error)
    }
    req.log.info('register() :: attempt to create registration was succesfull')
})

app.listen(port, function () {
    console.log(`Up and running on port: ${port}`)
})