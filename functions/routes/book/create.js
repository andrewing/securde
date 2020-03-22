import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const create = (event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    (err, decoded) => {
      if (err) throw jwtError(err);
      // const { title, authors, publisher, yearPublished, ISBN, reservedDate, reviews } = body
      // Create book here!
      callback(null, CODE[200]('WOot'));
    },
  );
};
