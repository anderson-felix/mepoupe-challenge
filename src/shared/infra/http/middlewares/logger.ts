import { NextFunction, Request, Response } from "express";
import { blue } from 'cli-color';

type FuncType = (req: Request, res: Response, next: NextFunction) => void;

const { log } = console;

const info = (value: string) => log(blue(value));

const logger: FuncType = (req, res, next) => {
  const data = JSON.stringify({ body: req.body, params: req.params, query: req.query }, null, 2)
  info(`call ${new Date().toLocaleString()} - ${req.method} ${process.env.APP_API_URL}${req.originalUrl}`);
  info(`data: ${data}`);
  next();
};

export default logger;