import { Router } from 'express';

import averageRouter from './average.routes';

const routes = Router();

routes.use(averageRouter);

export default routes;
