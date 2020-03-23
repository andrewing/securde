import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {get} from './get'

export default (route, ...rest) => {
  if (!route) def(...rest);
  else
    handlePath(
      route,
      [
        [get, 'get']
      ],
      ...rest,
    );
};
