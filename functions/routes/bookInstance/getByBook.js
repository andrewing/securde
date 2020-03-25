import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const edit = async (route, event, context, callback) => {
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');

  const {q: bookId} = event.queryStringParams;
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    async (err, decoded) => {
      if (err) jwtError(err);
      callback(null, CODE(200, 'Successfully got all book instance by book'));
    },
  );
};
