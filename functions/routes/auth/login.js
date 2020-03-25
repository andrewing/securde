import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, REFRESH_SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const login = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);
  if (!body.username) throw new ResponseError(400, 'No Username');
  if (!body.password) throw new ResponseError(400, 'No Password');
  // Check if user exists callback CODE[204] if none
  // Check password if same, if not throw 401 Error
  // use 500 when server fails

  const id = 'sample'; // get userid from db???
  const tokenPromise = jwt.sign({id}, SECRET, {
    expiresIn: '30m' /* audience: user.type */,
  });

  const refreshTokenPromise = jwt.sign({}, REFRESH_SECRET, {expiresIn: '30m'});

  Promise.all([tokenPromise, refreshTokenPromise])
    .then(([token, refreshToken]) => {
      callback(
        null,
        CODE(200, 'Successfully logged in', {token, refreshToken}),
      );
    })
    .catch(err => {
      throw jwtError(err);
    });
};
