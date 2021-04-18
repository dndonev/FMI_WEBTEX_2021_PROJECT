import { Application, Router } from 'express'
import * as authController from './auth/auth-controller.js'

const router = Router();

export function connect(app: Application, path: string): void {
    router.use('/auth', authController.default)

    app.use(path, router)
}
