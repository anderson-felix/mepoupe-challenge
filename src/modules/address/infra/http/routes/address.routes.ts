import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AddressController from '../controllers/AddressController';
import { throwAddressError } from '@modules/address/utils/addressValidation';

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

addressRouter.get('/', throwAddressError);

export default addressRouter;
