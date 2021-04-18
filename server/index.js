
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const appConfig = require('./app-config.json')

app.use(express.json())
app.use(cors())

app.get('*', function (req, res) {
    res.status(404).send()
})

app.listen(appConfig.server.port, () => {
    mongoose.connect(appConfig.mongodb.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Server listening on port ${appConfig.server.port}`))
        .catch(err => console.log(err))
})
