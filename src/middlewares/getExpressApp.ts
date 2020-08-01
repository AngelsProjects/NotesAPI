/* eslint-disable @typescript-eslint/no-unsafe-call */
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, NextFunction, Response, Request } from 'express';
import flash from 'express-flash';
import morgan from 'morgan';
import { mongo } from './mongo';
import onFinishCleanup from './onFinishCleanup';

const isOffline = process.env.NODE_ENV === 'development' || true;

export default (): Express => {
  const app: Express = express();

  app.use(mongo);
  app.use(morgan(isOffline ? 'dev' : 'combined'));
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(flash());
  app.disable('x-powered-by');

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Required for CORS support to work
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Required for cookies, authorization headers with HTTPS
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
    );
    next();
  });
  if (isOffline) {
    app.use(onFinishCleanup);
  }
  return app;
};
