import {handlePath} from '../../util/router';
import {CODE} from '../../util/code';

export const admin = (route, ...rest) => {
  if (route === '/') def(...rest);
  else handlePath(route, [], ...rest);
};

const def = (route, event, context, callback) => {
  callback(null, CODE(200, '/admin'));
};
