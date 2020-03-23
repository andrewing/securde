import jwt from 'jsonwebtoken';
import moment from 'moment';

import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Review from '../../db/models/review';
import SystemLog from '../../db/models/system_log';
import Account from '../../db/models/user';
import Book from '../../db/models/book';
import db from '../../db/db';

export const create = async (event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');

  const data = JSON.parse(event.body);

  /* creating one review */
  await Review.addReview(
    new Review({
      time: moment().format(),
      content: data.content,
      bookID: data.bookID,
      accountID: data.accountID,
    }),
  );

  const account = await Account.findAccountById(data.accountID);
  const book = await Book.findBookById(data.bookID);

  await SystemLog.addLog(
    new SystemLog({
      time: moment().format(),
      action: 'ADD',
      content: `[${account.lastname}, ${account.firstname}] added a review on [${book.title}]`,
    }),
  );

  callback(null, CODE[200]('Successfully created book'));
};
