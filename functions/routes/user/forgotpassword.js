import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const forgotpassword = (route, event, context, callback) => {
  if (event.httpMethod !== 'PUT') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {authorization} = event.headers;
};
