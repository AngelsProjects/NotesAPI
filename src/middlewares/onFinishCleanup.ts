/* eslint-disable @typescript-eslint/no-misused-promises */
import { disconnectDB } from '@db/mongo';
import { Request, Response } from 'express';

const afterResponse = () =>
  disconnectDB().then((err) => {
    console.log('mongoose:close', err);
  });

export default (_req: Request, res: Response, next: () => void) => {
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
};
