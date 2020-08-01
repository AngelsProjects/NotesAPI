const {
  MONGO_COLLECTION,
  MONGO_HOST,
  MONGO_PWD,
  MONGO_SCHEMA,
  MONGO_USER,
  NODE_ENV
} = process.env;
console.log('NODE_ENV:', NODE_ENV);
export const collection = MONGO_COLLECTION || '';
export const host       = MONGO_HOST || '';
export const password   = encodeURIComponent(MONGO_PWD || '');
export const schema     = MONGO_SCHEMA || '';
export const stage      = NODE_ENV || 'development';
export const user       = MONGO_USER || '';
