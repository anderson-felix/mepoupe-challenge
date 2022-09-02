import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AverageController from '../controllers/AverageController';

const averageRouter = Router();

averageRouter.get(
  '/:firstValue/:secondValue',
  celebrate({
    [Segments.PARAMS]: {
      firstValue: Joi.number().min(0),
      secondValue: Joi.number().min(0),
    },
  }),
  AverageController.calculate,
);

export default averageRouter;
