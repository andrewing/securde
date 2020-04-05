import {handlePath, getNextPath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {changepassword} from './changepassword';
import {forgotpassword} from './forgotpassword';
import {getQuestion} from './get-question';
import {history} from './history/index';
import {details} from './details';

export const user = (route, ...rest) => {
  handlePath(
    route,
    [
      [changepassword, '/change-password'],
      [forgotpassword, '/forgot-password'],
      [getQuestion, '/get-question'],
      [history, '/history'],
      [details, '/details'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = (route, event, context, callback) => {
  callback(null, CODE(200, '/user'));
};
