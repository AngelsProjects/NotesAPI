import { connectDB } from '@db/mongo';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const mongo = (_req: Request, _res: Response, next: NextFunction) =>
  connectDB().then(() => {
    next();
  });
