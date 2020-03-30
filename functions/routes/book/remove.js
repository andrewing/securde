import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Book from '../../db/models/book';
import SystemLog from '../../db/models/system_log';
import db from '../../db/db';

export const remove = async (route, event, context, callback) => {
  if (event.httpMethod !== 'PUT') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const data = JSON.parse(event.body);
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    (err, decoded) => {
      if (err) {
        callback(
          null,
          jwtError(err, decoded && decoded.user.username, 'REMOVE BOOK'),
        );
        return;
      }
      const {user} = decoded;
      Book.deleteBook(data.id)
        .then(() => {
          SystemLog.addLog(
            new SystemLog({
              time: moment().format(),
              action: 'DELETE',
              content: `${user.username} deleted a book [${data.id}] ${data.title}`,
            }),
          );
          callback(null, CODE(200, 'Successfully delete book'));
        })
        .catch(bookErr => {
          const {code, message} = bookErr;
          callback(null, CODE(code || 500, message));
        });
    },
  );
};
