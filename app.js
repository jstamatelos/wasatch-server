const express = require('express')
const { sendRegistrationEmail } = require('./routes/sendMail')

const port = process.env.PORT || 3000

const app = express()

app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World' }))
})

app.post('/register', function (req, res) {
    // call to send grid with body details
    sendRegistrationEmail(req, res)

})
app.listen(port, function () {
    console.log(`Example app listening on port !`)
})