
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const http = require('http').Server(app)

const appConfig = require('./app-config.json')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// api.connect(app, '/api')

app.get('*', function (req, res) {
    res.status(404).send()
})

http.listen(appConfig.server.port, () => {
    mongoose.connect(appConfig.mongodb.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Server listening on port ${appConfig.server.port}`))
        .catch(err => console.log(err))
})
