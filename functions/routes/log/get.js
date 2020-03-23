import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import SystemLog from '../../db/models/system_log';
import db from '../../db/db';

export const get = async (event, context, callback) => {
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');

  const logs = await SystemLog.findAllLogs();
  callback(null, CODE[200]('Successfully retrieved logs', {logs}));
};
