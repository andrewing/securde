import {handlePath} from '../../util/router';

export default (route, ...rest) => {
  if (!route) def(...rest);
  else handlePath(route, [], ...rest);
};

const def = (event, context, callback) => {
  console.log('/admin/');
};
