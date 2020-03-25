import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import Account from '../../db/models/user';
import {AUDIENCE} from '../../util/constants';

export const register = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  let body = JSON.parse(event.body);
  body = {
    ...body,
    type: AUDIENCE.BOOK_MANAGER,
  };
  Account.findUserByUsername(body.username)
    .then(found => {
      if (found) throw new ResponseError(409, 'Username already exists');
      Account.addAccount(
        new Account({...body}),
        callback(null, CODE(200, 'Successfully registered')),
      );
    })
    .catch(err => {
      throw new ResponseError(500);
    });
};
