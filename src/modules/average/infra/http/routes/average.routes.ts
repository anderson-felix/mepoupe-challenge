import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AverageController from '../controllers/AverageController';
import {
  joiAverageValidation,
  throwAverageError,
} from '@modules/average/utils/averageValidation';

const averageRouter = Router();

averageRouter.get(
  '/:firstValue/:secondValue',
  celebrate({
    [Segments.PARAMS]: {
      firstValue: joiAverageValidation,
      secondValue: joiAverageValidation,
    },
  }),
  AverageController.calculate,
);

averageRouter.get(
  '/:firstValue',
  celebrate({
    [Segments.PARAMS]: {
      firstValue: joiAverageValidation,
    },
  }),
  throwAverageError,
);

averageRouter.get('/', throwAverageError);

export default averageRouter;
