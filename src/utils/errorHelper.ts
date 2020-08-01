/* eslint-disable @typescript-eslint/no-explicit-any */
import Response from '@constants/response';

const {
  error,
  Codes: { InternalServerError }
} = Response;

export default (e: any, logger: boolean) => {
  let   { code, data, desc } = e;
  const { message }          = e;
  if (logger) console.error('Error:', e);
  code = code ?? InternalServerError;
  data = data ?? message;
  desc = desc ?? 'Unknow';
  throw error(code, data, desc);
};
