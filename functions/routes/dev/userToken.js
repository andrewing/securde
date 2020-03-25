import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';

export const userToken = (route, event, context, callback) => {
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');

  const id = 'sample'; // get userid from db???
  jwt.sign(
    {id},
    SECRET,
    {expiresIn: '7d', audience: AUDIENCE.USER},
    (err, token) => {
      if (err) throw new ResponseError(500, err.message);

      callback(
        null,
        CODE(200, 'Successfully Registered', {name: 'token', data: token}),
      );
    },
  );
};
