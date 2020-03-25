import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Book from '../../db/models/book';
import SystemLog from '../../db/models/system_log';
import db from '../../db/db';

export const update = async (route, event, context, callback) => {
  if (event.httpMethod !== 'PUT')
    throw new ResponseError(405, 'Method not allowed!');

  const data = JSON.parse(event.body);

  /* updating one book */
  const updated = await Book.updateBook(data._id, data);

  await SystemLog.addLog(
    new SystemLog({
      time: moment().format(),
      action: 'UPDATE',
      content: `Book manager updates book detail [ ${data.title}]`,
    }),
  );

  callback(null, CODE(200, 'Successfully updating book', {updated}));
};
