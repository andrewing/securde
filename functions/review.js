import router from './util/router';
import review from './routes/review';
import {CODE} from './util/code';

export const handler = (event, context, callback) => {
  try {
    router(review, event, context, callback);
  } catch (err) {
    const {code, message} = err;
    callback(null, CODE[code || 400](message));
  }
};
