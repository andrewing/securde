import router from './util/router';
import book from './routes/book';

export const handler = (event, context, callback) => {
  router(book, event, context, callback);
};
