import router from './util/router';
import {dev} from './routes/dev';
import {CODE} from './util/code';
import db from './db/db';

export const handler = (event, context, callback) => {
  try {
    router(dev, event, context, callback);
  } catch (err) {
    const {code, message} = err;
    callback(null, CODE(code || 400, message));
  }
};
