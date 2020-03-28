import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET} from '../../util/jwt';
import ResponseError from '../../util/error';
import Account from '../../db/models/user';
import {AUDIENCE} from '../../util/constants';
import db from '../../db/db';

export const register = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);
  Account.findUserByUsername(body.username)
    .then(({data: found}) => {
      if (found) throw new ResponseError(200, 'Username already exists');
      Account.addAccount(
        new Account({
          ...body,
        }),
        callback(null, CODE(200, 'Successfully registered')),
      );
    })
    .catch(err => {
      const {code, message} = err;
      callback(null, CODE(code || 500, message));
    });
};
