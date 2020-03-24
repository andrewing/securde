import {handlePath, getNextPath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {changepassword} from './changepassword';
import {forgotpassword} from './forgotpassword';
import {history} from './history/index';

export const user = (route, ...rest) => {
  handlePath(
    route,
    [
      [changepassword, '/changepassword'],
      [forgotpassword, '/forgotpassword'],
      [history, '/history'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = (route, event, context, callback) => {
  callback(null, CODE[200]('/user'));
};
