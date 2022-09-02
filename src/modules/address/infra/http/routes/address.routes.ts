import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AddressController from '../controllers/AddressController';

const addressRouter = Router();

addressRouter.get(
  '/:zipcode',
  celebrate({
    [Segments.PARAMS]: {
      zipcode: Joi.string(),
    },
  }),
  AddressController.get,
);

export default addressRouter;
