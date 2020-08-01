/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  collection,
  host,
  password,
  schema,
  stage,
  user
} from '@constants/environments/mongo';
import mongoose, {
  connect,
  connection,
  disconnect,
  Connection
} from 'mongoose';
import { equals, isNil, prop } from 'ramda';

require('mongoose-long')(mongoose);

export const connectDB = (): Promise<void | Connection> => {
  if (shouldConnect()) {
    console.log('Mongo:reusingConnection');
    return Promise.resolve();
  }
  console.log('stage:', stage);
  const prefixUri = `${schema}://`;
  const postfixUri = `${host}/${collection}?authSource=admin&retryWrites=true&w=majority`;
  if (stage === 'local') {
    const uri = `${prefixUri}${postfixUri}`;
    console.log('Mongo:connecting', uri);
    connect(uri, {
      useNewUrlParser   : true,
      useCreateIndex    : true,
      bufferCommands    : false,
      bufferMaxEntries  : 0,
      useUnifiedTopology: true,
      useFindAndModify  : false,
      pass              : password,
      user
    });
  } else {
    const uri = `${prefixUri}${user}:${password}@${postfixUri}`;
    console.log('Mongo:connecting', uri);
    connect(uri, {
      useNewUrlParser   : true,
      useCreateIndex    : true,
      bufferCommands    : false,
      bufferMaxEntries  : 0,
      useUnifiedTopology: true,
      useFindAndModify  : false
    });
  }
  return Promise.resolve(connection);
};

export const disconnectDB = () => disconnect().then((err) => err);

const shouldConnect = () =>
  !isNil(connection) && equals(prop('readyState')(connection), 1);
