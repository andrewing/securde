import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const login = (event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);
  if (!body.username) throw new ResponseError(400, 'No Username');
  if (!body.password) throw new ResponseError(400, 'No Password');
  // Check if user exists callback CODE[204] if none
  // Check password if same, if not throw 401 Error
  // use 500 when server fails

  const id = 'sample'; // get userid from db???
  jwt.sign(
    {id},
    SECRET,
    {expiresIn: '1h', audience: AUDIENCE.USER},
    (err, token) => {
      if (err) throw new ResponseError(500, err.message);

      callback(
        null,
        CODE[200]('Successfully Registered', {name: 'token', data: token}),
      );
    },
  );
};
