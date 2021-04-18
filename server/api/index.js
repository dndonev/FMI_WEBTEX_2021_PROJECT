import express from 'express'
import * as authController from './auth/auth-controller.js'

const { Router } = express;

const router = Router();

export function connect(app, path) {
    router.use('/auth', authController.default)

    app.use(path, router)
}
