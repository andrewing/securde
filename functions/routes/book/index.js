import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {create} from './create';
import {update} from './update';
import {get} from './get'
import {del} from './delete'
import db from '../../db/db'
import { Book } from '../../db/models/book'

export default (route, ...rest) => {
  if (!route) def(...rest);
  else
    handlePath(
      route,
      [
        [create, 'create'],
        [update, 'update'],
        [del, 'del'],
        [get, 'get']
      ],
      ...rest,
    );
};

const def = async (event, context, callback) => {
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');
  const {author} = event.queryStringParameters;
  const {title} = event.queryStringParameters;
  let book;
  if(author === "") {
    book = await Book.findBookByTitle(title);
  } else {
    book = await Book.findBookByAuthor(author);
  }

  callback(null, CODE[200]('Successful in gettings books', {book}));
};
