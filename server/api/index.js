const { Router } = require('express')
const authController = require('./auth/auth-controller')
const router = Router()

module.exports.connect = (app, path) => {
    router.use('/auth', authController)

    app.use(path, router)
}
