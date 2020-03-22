import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {adminToken} from './adminToken';
import {managerToken} from './managerToken';
import {userToken} from './userToken';

export const dev = (route, ...rest) => {
  if (!route) def(...rest);
  else
    handlePath(
      route,
      [
        [adminToken, 'adminToken'],
        [managerToken, 'managerToken'],
        [userToken, 'userToken'],
      ],
      ...rest,
    );
};

const def = (event, context, callback) => {};
