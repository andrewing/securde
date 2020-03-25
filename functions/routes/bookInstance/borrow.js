import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const borrow = (route, event, context, callback) => {
  if (event.httpMethod !== 'PUT')
    throw new ResponseError(405, 'Method not allowed!');
  const {bookId} = event.queryStringParameters;

  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.USER},
    (err, decoded) => {
      if (err) throw jwtError(err);
      // Update book reserved field
      // const {userId} = decoded
      // reserved date: new Date()
      callback(null, CODE(200, `Successfully borrowed book`, {book: bookId}));
    },
  );
};
