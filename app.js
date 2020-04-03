const express = require('express')
const { sendRegistrationEmail } = require('./routes/sendMail')
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World' }))
})

app.post('/register', function (req, res) {
    // call to send grid with body details
    console.log('Request incoming: ', req.body)
    sendRegistrationEmail(req, res)
})

app.post('/test', function (req, res) {
    // call to send grid with body details
    res.send(JSON.stringify({ Hello: 'POST' }))

})

app.listen(port, function () {
    console.log(`Example app listening on port !`)
})