import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const edit = async (route, event, context, callback) => {
  if (event.httpMethod !== 'GET') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {q: bookId} = event.queryStringParams;
  const {authorization} = event.headers;
};
