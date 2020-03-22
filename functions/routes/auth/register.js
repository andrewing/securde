import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET} from '../../util/jwt';
import ResponseError from '../../util/error';

export const register = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const body = JSON.parse(event.body);

  if (!body.username) throw new ResponseError(400, 'No Username');
  if (!body.password) throw new ResponseError(400, 'No Password');
  // Check if there is existing user already throw new ResponseError() if there is

  const id = 'sample'; // generate?
  jwt.sign({id}, SECRET, {expiresIn: '7d'}, (err, token) => {
    if (err) throw new ResponseError(500, err.message);

    // Add to db here
    callback(
      null,
      CODE[200]('Successfully Registered', {name: 'token', data: token}),
    );
  });
};
