import router from './util/router';
import {auth} from './routes/auth';
import {CODE} from './util/code';
import ResponseError from './util/error';

export const handler = (event, context, callback) => {
  try {
    router(auth, event, context, callback);
  } catch (err) {
    const {code, message} = err;
    callback(null, CODE(code || 400, message));
  }
};
