import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import { Book } from '../../db/models/book'
import { SystemLog } from '../../db/models/system_log'
import db from '../../db/db'
import moment from 'moment'

export const del = async (event, context, callback) => {
  if (event.httpMethod !== 'PUT')
    throw new ResponseError(405, 'Method not allowed!');

  const data = JSON.parse(event.body);

  /* deleting one book */
  await Book.deleteBook(data._id);

  await SystemLog.addLog(new SystemLog({
    time: moment().format(),
    action: 'DELETE',
    content: 'Book manager deleted a book [' + data.title + ']'
  }))
  
  callback(null, CODE[200]('Successfully delete book'));
};