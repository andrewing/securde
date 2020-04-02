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
  if (event.httpMethod !== 'POST') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const data = JSON.parse(event.body);
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    async (err, decoded) => {
      if (err) {
        callback(
          null,
          jwtError(err, decoded && decoded.user.username, 'CREATE BOOK'),
        );
        return;
      }
      const {user} = decoded;
      const book = new Book({
        ...data,
        reviews: [],
      });
      Book.addBook(book)
        .then(() => {
          SystemLog.addLog(
            new SystemLog({
              time: moment().format(),
              action: 'CREATE BOOK',
              content: `Created a book [${book._id}] ${book.title}`,
              account: user._id,
            }),
          );
        })
        .catch(bookErr => {
          const {code, message} = bookErr;
          callback(null, CODE(code || 500, message));
        });
      callback(null, CODE(200, 'Successfully created book'));
    },
  );
};
