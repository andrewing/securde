import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import BookInstance from '../../db/models/book_instance';
import SystemLog from '../../db/models/system_log';
import LibraryLog from '../../db/models/library_log';

export const ret = (route, event, context, callback) => {
  if (event.httpMethod !== 'PUT') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {bookInstanceId} = event.queryStringParameters;
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: [AUDIENCE.USER_STUDENT, AUDIENCE.USER_TEACHER]},
    (err, decoded) => {
      if (err) {
        callback(
          null,
          jwtError(
            err,
            decoded && decoded.user.username,
            'BORROW BOOK INSTANCE',
          ),
        );
        return;
      }

      BookInstance.returnBookInstance(bookInstanceId).then(() => {
        LibraryLog.findLibraryLogsByBook(bookInstanceId).then(log => {
          LibraryLog.logReturn(log._id, moment().format());
        });

        SystemLog.addLog(
          new SystemLog({
            time: moment().format(),
            action: 'RETURN BOOK',
            content: `${decoded.user.username} returned bookId [${bookInstanceId}]`,
          }),
        );
        callback(
          null,
          CODE(200, `Successfully borrowed book`, {book: bookInstanceId}),
        );
      });
    },
  );
};
