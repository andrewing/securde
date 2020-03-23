import router from './util/router';
import log from './routes/log';
import {CODE} from './util/code';

export const handler = (event, context, callback) => {
  try {
    router(log, event, context, callback);
  } catch (err) {
    const {code, message} = err;
    callback(null, CODE[code || 400](message));
  }
};
