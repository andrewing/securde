import moment from 'moment';
import ResponseError from './error';
import SystemLog from '../db/models/system_log';
import {CODE} from './code';

export const SECRET = process.env.AUTHSECRET || 'localhostsecret';
export const REFRESH_SECRET =
  process.env.REFRESH_SECRET || 'localhostrefreshsecret';

export const jwtError = (
  err,
  username = 'Anonymous User',
  action = 'JWT TOKEN ERROR',
) => {
  SystemLog.addLog(
    new SystemLog({
      time: moment().format(),
      action,
      content: `${username} tried to access but encountered an error: ${err.message}`,
    }),
  );
  switch (err.name.toUpperCase()) {
    case 'TOKENEXPIREDERROR':
    case 'JSONWEBTOKENERROR':
      return CODE(401, err.message);
    default:
      return CODE(500, err.message);
  }
};
