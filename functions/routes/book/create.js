import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Book from '../../db/models/book';
import SystemLog from '../../db/models/system_log';
import db from '../../db/db';

export const create = async (route, event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');

  const data = JSON.parse(event.body);
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    async (err, decoded) => {
      await Book.addBook(
        new Book({
          ...data,
          reviews: [],
        }),
      );

      SystemLog.addLog(
        new SystemLog({
          time: moment().format(),
          action: 'CREATE BOOK',
          content: `Created a book [${data.title}]`,
        }),
      );

      callback(null, CODE(200, 'Successfully created book'));
    },
  );
};
