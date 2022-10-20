import { Router } from 'express';

import averageRoutes from '@modules/average/infra/http/routes';
import addressRoutes from '@modules/address/infra/http/routes';
import logRoutes from '@modules/log/infra/http/routes';
import uploadRouter from '@modules/upload/infra/http/routes';
import logger from '../middlewares/logger';

const routes = Router();

routes.all('*', logger)

routes.use('/average', averageRoutes);
routes.use('/address', addressRoutes);
routes.use('/logs', logRoutes);
routes.use('/upload', uploadRouter);

export default routes;
