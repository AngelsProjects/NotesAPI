/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';
import { bind } from 'ramda';

export default (fn: any, res: Response, req?: Request) =>
  (req ? fn(req) : fn()).then(bind(res.send, res)).catch(bind(res.send, res));
