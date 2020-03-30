import jwt from 'jsonwebtoken';
import moment from 'moment';

import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Review from '../../db/models/review';
import SystemLog from '../../db/models/system_log';
import Account from '../../db/models/account';
import Book from '../../db/models/book';
import db from '../../db/db';

export const create = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const data = JSON.parse(event.body);
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {audience: [AUDIENCE.USER_STUDENT, AUDIENCE.USER_TEACHER]},
    (err, decoded) => {
      if (err) {
        callback(null, jwtError(err, decoded && decoded.user.username, ''));
        return;
      }
      Review.addReview(
        new Review({
          time: moment().format(),
          accountId: decoded.user._id,
          ...data,
        }),
      )
        .then(() => {
          SystemLog.addLog(
            new SystemLog({
              time: moment().format(),
              action: 'BOOK REVIEW',
              content: `${decoded.user.username} added a review on book ID [${data.bookId}]`,
            }),
          );
          callback(null, CODE(200, 'Successfully created review'));
        })
        .catch(reviewErr => {
          const {code, message} = reviewErr;
          callback(null, CODE(code || 500, message));
        });
    },
  );
};
