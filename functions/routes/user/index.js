import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';

export default (route, ...rest) => {
  if (!route) def(...rest);
  else handlePath(route, [], ...rest);
};

const def = (event, context, callback) => {
  console.log('/user/');
};
