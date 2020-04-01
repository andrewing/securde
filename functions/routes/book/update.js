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
  if (event.httpMethod !== 'PUT') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const data = JSON.parse(event.body);
  const {q: _id} = event.queryStringParameters;
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    (err, decoded) => {
      if (err) {
        callback(
          null,
          jwtError(err, decoded && decoded.user.username, 'UPDATE BOOK'),
        );
        return;
      }
      Book.updateBook(_id, data)
        .then(updated => {
          SystemLog.addLog(
            new SystemLog({
              time: moment().format(),
              action: 'UPDATE',
              content: `Book manager updates book detail [ ${data.title}]`,
            }),
          );
          callback(
            null,
            CODE(200, 'Successfully updated book', {updated: updated.data}),
          );
        })
        .catch(bookErr => {
          const {code, message} = bookErr;
          callback(null, CODE(code || 500, message));
        });
    },
  );
};
