import {handlePath} from '../../util/router';

export const admin = (route, ...rest) => {
  if (!route) def(...rest);
  else handlePath(route, [], ...rest);
};

const def = (event, context, callback) => {
  console.log('/admin/');
};
