import {handlePath} from '../../util/router';
import {CODE} from '../../util/code';
import {createManager} from './create-manager';
import {updateAccount} from './update-account';
import {logs} from './logs';

export const admin = (route, ...rest) => {
  handlePath(
    route,
    [
      [createManager, '/create-manager'],
      [updateAccount, '/update-account'],
      [logs, '/logs'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = (route, event, context, callback) => {
  callback(null, CODE(200, '/admin'));
};
