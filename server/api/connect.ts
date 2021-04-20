import { Application, Router } from 'express'
import authController from './auth/auth-controller'
import filesController from './files/files-controller';

const router = Router();

export function connect(app: Application, path: string): void {
    router.use('/auth', authController);
    router.use('/files', filesController);

    app.use(path, router);
}
