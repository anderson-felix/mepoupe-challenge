import { Router } from 'express';

import logRouter from './log.routes';

const routes = Router();

routes.use(logRouter);

export default routes;
