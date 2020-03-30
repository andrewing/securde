import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Book from '../../db/models/book';
import db from '../../db/db';

export const get = async (event, context, callback) => {
  if (event.httpMethod !== 'GET') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const book = await Book.findAllBooks();
  callback(null, CODE(200, 'Successfully retrieved books', {book}));
};
