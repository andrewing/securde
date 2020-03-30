import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const borrow = (route, event, context, callback) => {
  if (event.httpMethod !== 'PUT') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {bookId} = event.queryStringParameters;

  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: [AUDIENCE.USER_STUDENT, AUDIENCE.USER_TEACHER]},
    (err, decoded) => {
      if (err) {
        callback(
          null,
          jwtError(
            err,
            decoded && decoded.user.username,
            'BORROW BOOK INSTANCE',
          ),
        );
        return;
      }
      // Update book reserved field
      // const {userId} = decoded
      // reserved date: new Date()
      callback(null, CODE(200, `Successfully borrowed book`, {book: bookId}));
    },
  );
};
