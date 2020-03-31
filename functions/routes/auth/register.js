import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET} from '../../util/jwt';
import ResponseError from '../../util/error';
import Account from '../../db/models/account';
import {AUDIENCE} from '../../util/constants';
import db from '../../db/db';
import SystemLog from '../../db/models/system_log';

export const register = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const body = JSON.parse(event.body);
  Account.findUserByUsername(body.username)
    .then(({data: found}) => {
      if (found) {
        SystemLog.addLog(
          new SystemLog({
            time: moment().format(),
            action: 'USER REGISTER ATTEMPT',
            content: `Anonymous user tried to register but ${body.username} already existed`,
          }),
        );
        throw new ResponseError(409, 'Username already exists');
      }
      Account.addAccount(
        new Account({
          ...body,
        }),
        callback(null, CODE(200, 'Successfully registered')),
      );
      SystemLog.addLog(
        new SystemLog({
          time: moment().format(),
          action: 'USER REGISTER',
          content: `User ${body.username} registered`,
        }),
      );
    })
    .catch(err => {
      const {code, message} = err;
      callback(null, CODE(code || 500, message));
    });
};
