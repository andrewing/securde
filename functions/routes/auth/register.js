import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET} from '../../util/jwt';
import ResponseError from '../../util/error';
import Account from '../../db/models/user';

export const register = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);

  callback(null, CODE(200, 'Successfully registered'));
};
