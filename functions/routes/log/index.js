import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {get} from './get';

export default (route, ...rest) => {
  handlePath(
    route,
    [
      [get, '/get'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = (route, ...rest) => {};
