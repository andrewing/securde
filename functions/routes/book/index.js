import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {create} from './create';
import {update} from './update';
import {remove} from './remove';
import {get} from './get';
import db from '../../db/db';
import Book from '../../db/models/book';

export const book = (route, ...rest) => {
  handlePath(
    route,
    [
      [create, '/create'],
      [update, '/update'],
      [remove, '/remove'],
      [get, '/get'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = async (route, event, context, callback) => {
  if (event.httpMethod !== 'GET') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {author, title} = event.queryStringParameters;
  let bookObj;
  if (!author) {
    bookObj = await Book.findBookByTitle(title);
  } else {
    bookObj = await Book.findBookByAuthor(author);
  }

  callback(null, CODE(200, 'Successful in gettings books', {book: bookObj}));
};
