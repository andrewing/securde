import jwt from 'jsonwebtoken';
import {CODE} from './api/code';
import {SECRET} from './api/jwt';

export const handler = (event, context, callback) => {
  if (event.httpMethod !== 'POST') callback(null, CODE[405]());
  let body;
  try {
    body = JSON.parse(event.body);
    if (!body.id) {
      callback(null, CODE[400]());
      return;
    }
  } catch (err) {
    callback(null, CODE[400]());
    return;
  }

  const {id} = body;
  // Create user here
  jwt.sign({id}, SECRET, {expiresIn: '1m'}, (err, token) => {
    if (err) callback(null, CODE[500]());

    // Add to db here
    callback(null, CODE[200]('Successfully Registered', token));
  });
};
