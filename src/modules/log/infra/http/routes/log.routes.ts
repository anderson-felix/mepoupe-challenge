import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import LogController from '../controllers/LogController';
import { getPagingHandler } from '@shared/infra/http/middlewares/getPagingHandler';

const logRouter = Router();

logRouter.get('/', getPagingHandler(), LogController.list);

export default logRouter;
