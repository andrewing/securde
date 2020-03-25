import jwt from 'jsonwebtoken';
import {CODE} from './util/code';
import ResponseError from './util/error';
import {jwtError, REFRESH_SECRET, SECRET} from './util/jwt';

export const handler = (event, context, callback) => {
  try {
    if (event.httpMethod !== 'POST')
      throw new ResponseError(405, 'Method not allowed!');

    const {authorization: oldRefreshToken} = event.headers;

    jwt.verify(oldRefreshToken, REFRESH_SECRET, err => {
      if (err) throw jwtError(err);
      const tokenPromise = jwt.sign({}, SECRET, {expiresIn: '30m'});
      const refreshTokenPromise = jwt.sign({}, REFRESH_SECRET, {
        expiresIn: '30m',
      });

      Promise.all([tokenPromise, refreshTokenPromise])
        .then(([token, refreshToken]) => {
          callback(null, CODE(200, null, {token, refreshToken}));
        })
        .catch(pErr => {
          throw jwtError(pErr);
        });
    });
  } catch (err) {
    const {code, message} = err;
    callback(null, CODE(code || 400, message));
  }
};
