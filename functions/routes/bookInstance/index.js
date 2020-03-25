import jwt from 'jsonwebtoken';
import {handlePath} from '../../util/router';
import {CODE} from '../../util/code';
import {create} from './create';
import {edit} from './edit';
import {remove} from './remove';
import {borrow} from './borrow';
import ResponseError from '../../util/error';
import {SECRET, jwtError} from '../../util/jwt';
import {AUDIENCE} from '../../util/constants';

export const bookInstance = (route, ...rest) => {
  if (route === '/') def(...rest);
  else
    handlePath(
      route,
      [
        [create, '/create'],
        [edit, '/edit'],
        [remove, '/remove'],
        [borrow, '/borrow'],
        [def, '/'],
      ],
      ...rest,
    );
};

const def = (route, event, context, callback) => {
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');

  const {q: bookInstanceId} = event.queryStringParams;
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    async (err, decoded) => {
      if (err) jwtError(err);
      callback(null, CODE(200, 'Successfully got book instance'));
    },
  );
};
