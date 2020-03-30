import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, REFRESH_SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Account from '../../db/models/account';
import db from '../../db/db';
import SystemLog from '../../db/models/system_log';

export const login = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const body = JSON.parse(event.body);
  const {username, password} = body;

  Account.findUserByUsername(username)
    .then(({data: found}) => {
      if (!found) {
        SystemLog.addLog(
          new SystemLog({
            time: moment().format(),
            action: 'LOG IN ATTEMPT',
            content: `Anonymous user tried ${username} but it did not exist`,
          }),
        );
        throw new ResponseError(404, 'User Not Found');
      }

      Account.authenticate(username, password, found.salt)
        .then(({data: user}) => {
          if (!user) {
            SystemLog.addLog(
              new SystemLog({
                time: moment().format(),
                action: 'LOG IN ATTEMPT',
                content: `${username} tried to log in`,
              }),
            );
            throw new ResponseError(401, 'Incorrect Password');
          }

          const {type} = user;
          const tokenPromise = jwt.sign({user}, SECRET, {
            expiresIn: '30m',
            audience: type,
          });

          const refreshTokenPromise = jwt.sign({}, REFRESH_SECRET, {
            expiresIn: '30m',
          });

          Promise.all([tokenPromise, refreshTokenPromise])
            .then(([token, refreshToken]) => {
              SystemLog.addLog(
                new SystemLog({
                  time: moment().format(),
                  action: 'LOG IN',
                  content: `${username} logged in`,
                }),
              );
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
