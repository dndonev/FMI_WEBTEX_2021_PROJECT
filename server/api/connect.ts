import { Application, Router } from 'express'
import authController from './auth/auth-controller'
import filesController from './files/files-controller';
import directoriesController from './directories/directories-controller';

const router = Router();

export const connect = (app: Application, path: string): void => {
    router.use('/auth', authController);
    router.use('/files', filesController);
    router.use('/directories', directoriesController);

    app.use(path, router);
}

