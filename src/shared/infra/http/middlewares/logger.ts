import { NextFunction, Request, Response } from "express";
import { blue } from 'cli-color';

type FuncType = (req: Request, res: Response, next: NextFunction) => void;

const { log } = console;

const info = (value: string) => log(blue(value));

const logger: FuncType = (req, res, next) => {
  info(`call ${new Date().toLocaleString()} - ${req.method} ${req.originalUrl}`);
  next();
};

export default logger;