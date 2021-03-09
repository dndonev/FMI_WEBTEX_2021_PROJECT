const { Router } = require('express')

const router = Router()

module.exports.connect = (app, path) => {
    // router.use('/tour', tourController)

    app.use(path, router)
} // REST API
