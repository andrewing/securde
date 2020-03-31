import jwt from 'jsonwebtoken';
import moment from 'moment';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import BookInstance from '../../db/models/book_instance';

export const create = async (route, event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const data = JSON.parse(event.body);
  const {bookId} = data;
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: AUDIENCE.BOOK_MANAGER},
    async (err, decoded) => {
      if (err) {
        callback(
          null,
          jwtError(
            err,
            decoded && decoded.user.username,
            'CREATE BOOK INSTANCE',
          ),
        );
        return;
      }

      BookInstance.addBookInstance(
        new BookInstance({
          bookId,
          isReserved: false,
        }),
      )
        .then(() => {
          callback(null, CODE(200, 'Successfully created book instance'));
        })
        .catch(bookInstanceErr => {
          const {code, message} = bookInstanceErr;
          callback(null, CODE(code || 500, message));
        });
    },
  );
};
