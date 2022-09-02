import { Router } from 'express';

import averageRoutes from '@modules/average/infra/http/routes';
import addressRoutes from '@modules/address/infra/http/routes';
import logRoutes from '@modules/log/infra/http/routes';

const routes = Router();

routes.use('/average', averageRoutes);
routes.use('/address', addressRoutes);
routes.use('/logs', logRoutes);

export default routes;
