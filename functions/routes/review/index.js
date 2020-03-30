import jwt from 'jsonwebtoken';
import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {create} from './create';
import db from '../../db/db';
import Review from '../../db/models/review';
import {jwtError, SECRET} from '../../util/jwt';
import {AUDIENCE} from '../../util/constants';

export default (route, ...rest) => {
  handlePath(
    route,
    [
      [create, '/create'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = async (route, event, context, callback) => {
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');

  const {q: bookId} = event.queryStringParameters;

  const {authorization} = event.headers;
  jwt.verify(
    authorization,
    SECRET,
    {audience: [AUDIENCE.USER_TEACHER, AUDIENCE.USER_STUDENT]},
    async (err, decoded) => {
      if (err) jwtError(err);
      const reviews = await Review.findReviewsByBook(bookId);
      callback(null, CODE(200, 'Successful in user reviews', {reviews}));
    },
  );
};
