import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import {isMongooseId} from '../../util/mongoose';
import BookInstance from '../../db/models/book_instance';
import SystemLog from '../../db/models/system_log';
import LibraryLog from '../../db/models/library_log';
import db from '../../db/db';
import Account from '../../db/models/account';

export const borrow = (route, event, context, callback) => {
  if (event.httpMethod !== 'PUT') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {q} = event.queryStringParameters;
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: [AUDIENCE.USER_STUDENT, AUDIENCE.USER_TEACHER]},
    async (err, decoded) => {
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
      const {user} = decoded;

      if (!isMongooseId(q)) {
        callback(null, CODE(400, `Book Instance ID was invalid`));
        return;
      }

      const book = await BookInstance.findById(q);
      if (!book) {
        callback(null, CODE(409, `Book does not exist`));
        return;
      }
      if (!book.isAvailable) {
        callback(null, CODE(409, `Book has already been borrowed`));
        return;
      }
      BookInstance.borrowBookInstance(q)
        .then(() => {
          const log = new LibraryLog({
            timeBorrowed: moment().format(),
            timeReturned: null,
            book: q,
            account: user._id,
          });

          LibraryLog.addLog(log);

          Account.addBookHistory(user._id, book._id, log._id);

          SystemLog.addLog(
            new SystemLog({
              time: moment().format(),
              action: 'BORROW BOOK',
              content: `Borrowed [${book._id}] ${book.title}`,
              account: user._id,
            }),
          );
          callback(null, CODE(200, `Successfully borrowed book`, {book}));
        })
        .catch(borrowErr => {
          const {code, message} = borrowErr;
          callback(null, CODE(code || 500, message));
        });
    },
  );
};
