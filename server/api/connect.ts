import { Application, Router } from 'express'
import authController from './auth/auth-controller'
import filesController from './files/files-controller';
import directoriesController from './directories/directories-controller';
import statisticsController from './statistics/statistics-controller';
import shareController from './share/share-controller';

const router = Router();

export const connect = (app: Application, path: string): void => {
    router.use('/auth', authController);
    router.use('/files', filesController);
    router.use('/directories', directoriesController);
    router.use('/statistics', statisticsController);
    router.use('/share', shareController);

    app.use(path, router);
}
