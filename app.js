const express = require('express')
const { sendRegistrationEmail } = require('./routes/sendMail')
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World' }))
})

app.post('/register', function (req, res) {
    try {
        sendRegistrationEmail(req, res)
        res.send('registration successfull posted')
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, function () {
    console.log(`Up and running on port: ${port}`)
})