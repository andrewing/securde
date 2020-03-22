import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const register = (event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);
  const {authorization} = event.headers;

  if (!body.username) throw new ResponseError(400, 'No Username');
  if (!body.password) throw new ResponseError(400, 'No Password');
  // Check if there is existing user already throw new ResponseError() if there is

  // jwt.verify(authorization, SECRET, )
};
