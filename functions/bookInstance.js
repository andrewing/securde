import router from './util/router';
import {bookInstance} from './routes/bookInstance';
import {CODE} from './util/code';

export const handler = (event, context, callback) => {
  try {
    router(bookInstance, event, context, callback);
  } catch (err) {
    const {code, message} = err;
    callback(null, CODE[code || 400](message));
  }
};
