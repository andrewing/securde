import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, REFRESH_SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Account from '../../db/models/user';
import db from '../../db/db';

export const login = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);
  const {username, password} = body;

  Account.findUserByUsername(username)
    .then(({data: found}) => {
      if (!found) throw new ResponseError(404, 'User Not Found');
      Account.authenticate(username, password, found.salt)
        .then(({data: user}) => {
          if (!user) throw new ResponseError(404, 'Incorrect Password');
          const {_id, type} = user;
          const tokenPromise = jwt.sign({userId: _id}, SECRET, {
            expiresIn: '30m',
            audience: type,
          });

          const refreshTokenPromise = jwt.sign({}, REFRESH_SECRET, {
            expiresIn: '30m',
          });

          Promise.all([tokenPromise, refreshTokenPromise])
            .then(([token, refreshToken]) => {
              callback(
                null,
                CODE(200, 'Successfully logged in', {token, refreshToken}),
              );
            })
            .catch(err => {
              const {code, message} = jwtError(err);
              callback(null, CODE(code || 500, message));
            });
        })
        .catch(err => {
          const {code, message} = err;
          callback(null, CODE(code || 500, message));
        });
    })
    .catch(err => {
      const {code, message} = err;
      callback(null, CODE(code || 500, message));
    });

  // const {data:user, err:authErr} = await
  // if(!user) throw new ResponseError(401, "Incorrect Password")
  // if(authErr) throw new ResponseError(500, authErr.message)
};
