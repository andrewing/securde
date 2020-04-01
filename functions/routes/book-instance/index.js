import jwt from 'jsonwebtoken';
import {handlePath} from '../../util/router';
import {CODE} from '../../util/code';
import {create} from './create';
import {edit} from './edit';
import {remove} from './remove';
import {borrow} from './borrow';
import {ret} from './return';
import ResponseError from '../../util/error';
import {SECRET, jwtError} from '../../util/jwt';
import {AUDIENCE} from '../../util/constants';

export const bookInstance = (route, ...rest) => {
  handlePath(
    route,
    [
      [create, '/create'],
      [edit, '/edit'],
      [remove, '/remove'],
      [borrow, '/borrow'],
      [ret, '/return'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = (route, event, context, callback) => {
  // if (event.httpMethod !== 'GET') {
  //   callback(null, CODE(405, 'Method not allowed'));
  //   return;
  // }
  // const {q: bookInstanceId} = event.queryStringParams;
  // const {authorization} = event.headers;
  callback(null, CODE(200, 'Success!'));
};
