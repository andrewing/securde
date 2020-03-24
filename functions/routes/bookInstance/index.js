import {handlePath} from '../../util/router';
import {CODE} from '../../util/code';
import {create} from './create';
import {edit} from './edit';
import {remove} from './remove';

export const bookInstance = (route, ...rest) => {
  if (route === '/') def(...rest);
  else
    handlePath(
      route,
      [
        [create, '/create'],
        [edit, '/edit'],
        [remove, '/remove'],
        [def, '/'],
      ],
      ...rest,
    );
};

const def = (route, event, context, callback) => {
  callback(null, CODE[200]('/bookInstance'));
};
