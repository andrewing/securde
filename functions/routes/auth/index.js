import {handlePath} from '../../util/router';
import {login} from './login';
import {register} from './register';
import {CODE} from '../../util/code';
import ResponseError from '../../util/error';

export const auth = (route, ...rest) => {
  if (!route) def(...rest);
  else
    handlePath(
      route,
      [
        [login, 'login'],
        [register, 'register'],
      ],
      ...rest,
    );
};

const def = (event, context, callback) => {
  console.log('/auth/');
};
