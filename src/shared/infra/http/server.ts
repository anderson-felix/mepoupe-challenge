/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/container';
import '@shared/infra/typeorm';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import { getClientLanguage } from './middlewares/getClientLanguage';
import { appErrorHandler } from './middlewares/appErrorHandler';

const port = process.env.PORT || '5000';
const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(cors());
app.use(getClientLanguage);
app.use(routes);

app.use(errors());
app.use(appErrorHandler);

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`),
);
