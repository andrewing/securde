import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const update = (event, context, callback) => {
  if (event.httpMethod !== 'PUT')
    throw new ResponseError(405, 'Method not allowed!');
  const {bookId} = event.queryStringParameters;
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    (err, decoded) => {
      if (err) throw jwtError(err);
      // Delete book here!
      callback(null, CODE[200]('Successfully Deleted Book'));
    },
  );
};
