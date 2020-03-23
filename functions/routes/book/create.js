import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import { Book } from '../../db/models/book'
import { SystemLog } from '../../db/models/system_log'
import db from '../../db/db'
import moment from 'moment'

export const create = async (event, context, callback) => {
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');

  const data = JSON.parse(event.body);

  /* creating one book */
  await Book.addBook(new Book({
    title: data.title,
    author: data.author,
    publisher: data.publisher,
    yearOfPublication: data.yearOfPublication,
    ISBN: data.ISBN,
    callNumber: data.callNumber,
    reviews: []
  }))

  await SystemLog.addLog(new SystemLog({
    time: moment().format(),
    action: 'ADD',
    content: 'Book manager added a new book [' + data.title + ']'
  }))
  
  callback(null, CODE[200]('Successfully created book'));
};
