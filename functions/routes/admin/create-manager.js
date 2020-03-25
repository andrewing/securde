import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const register = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.ADMIN},
    (err, decoded) => {
      if (err) jwtError(err);
      if (!body.username) throw new ResponseError(400, 'No Username');
      if (!body.password) throw new ResponseError(400, 'No Password');
      // Check if user exists. throw error if it does

      callback(null, CODE(200, 'Successfully created manager!'));
    },
  );
};
