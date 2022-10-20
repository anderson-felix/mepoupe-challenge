import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UploadController from '../controllers/UploadController';

const logRouter = Router();

logRouter.get('/object/link/:key', celebrate({
  [Segments.PARAMS]: {
    key: Joi.string().required()
  },
}), UploadController.getObjectLink);

logRouter.get('/link', celebrate({
  [Segments.QUERY]: {
    mimetype: Joi.string().required()
  },
}), UploadController.getUploadLink);

logRouter.put('/', celebrate({
  [Segments.QUERY]: {
    filename: Joi.string().required(),
  },
}), UploadController.upload);

export default logRouter;
