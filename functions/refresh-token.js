import jwt from 'jsonwebtoken';
import {CODE} from './util/code';
import ResponseError from './util/error';
import {jwtError, REFRESH_SECRET, SECRET} from './util/jwt';
import db from './db/db';
import Account from './db/models/account';

export const handler = (event, context, callback) => {
  try {
    if (event.httpMethod !== 'POST')
      throw new ResponseError(405, 'Method not allowed!');

    const {authorization: oldRefreshToken} = event.headers;

    jwt.verify(oldRefreshToken, REFRESH_SECRET, (err, decoded) => {
      if (err) throw jwtError(err);
      const {id} = decoded;
      Account.findById(id)
        .then(user => {
          const tokenPromise = jwt.sign({user}, SECRET, {expiresIn: '30m'});
          const refreshTokenPromise = jwt.sign({id}, REFRESH_SECRET, {
            expiresIn: '30m',
          });

          Promise.all([tokenPromise, refreshTokenPromise])
            .then(([token, refreshToken]) => {
              callback(
                null,
                CODE(200, null, {access: token, refresh: refreshToken}),
              );
            })
            .catch(pErr => {
              throw jwtError(pErr);
            });
        })
        .catch(refErr => {
          const {code, message} = refErr;
          callback(null, CODE(code || 500, message));
        });
    });
  } catch (err) {
    const {code, message} = err;
    callback(null, CODE(code || 400, message));
  }
};
