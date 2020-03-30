import jwt from 'jsonwebtoken';
import {CODE} from '../../../util/code';
import {SECRET, jwtError} from '../../../util/jwt';
import ResponseError from '../../../util/error';
import {AUDIENCE} from '../../../util/constants';

export const book = (route, event, context, callback) => {
  if (event.httpMethod !== 'GET') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: [AUDIENCE.USER_STUDENT, AUDIENCE.USER_TEACHER]},
    (err, decoded) => {
      if (err) {
        callback(null, jwtError(err, decoded && decoded.user.username, ''));
        return;
      }

      callback(null, CODE(200, `Successfully retrieved book history`));
    },
  );
};
