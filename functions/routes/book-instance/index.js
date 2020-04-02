import jwt from 'jsonwebtoken';
import {handlePath} from '../../util/router';
import {CODE} from '../../util/code';
import {create} from './create';
import {update} from './update';
import {remove} from './remove';
import {borrow} from './borrow';
import {byBook} from './by-book';
import {ret} from './return';
import ResponseError from '../../util/error';
import {SECRET, jwtError} from '../../util/jwt';
import {AUDIENCE} from '../../util/constants';
import BookInstance from '../../db/models/book_instance';

export const bookInstance = (route, ...rest) => {
  handlePath(
    route,
    [
      [create, '/create'],
      [update, '/update'],
      [remove, '/remove'],
      [borrow, '/borrow'],
      [ret, '/return'],
      [byBook, '/by-book'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = (route, event, context, callback) => {
  if (event.httpMethod !== 'GET') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {q} = event.queryStringParameters;

  BookInstance.findById(q)
    .then(val => {
      callback(
        null,
        CODE(200, 'Successfully got book instance', {bookInstance: val}),
      );
    })
    .catch(err => {
      const {code, message} = err;
      callback(null, CODE(code || 500, message));
    });
};
