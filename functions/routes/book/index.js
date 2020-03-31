import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {create} from './create';
import {update} from './update';
import {remove} from './remove';
import {get} from './get';
import db from '../../db/db';
import Book from '../../db/models/book';
import Review from '../../db/models/review';

export const book = (route, ...rest) => {
  handlePath(
    route,
    [
      [create, '/create'],
      [update, '/update'],
      [remove, '/remove'],
      [get, '/get'],
      [def, '/'],
    ],
    ...rest,
  );
};

const def = async (route, event, context, callback) => {
  if (event.httpMethod !== 'GET') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {q} = event.queryStringParameters;
  const booksByTitle = await Book.findBookByTitle(q);
  const booksByAuthor = await Book.findBookByAuthor(q);
  // console.log(booksByTitle, booksByAuthor)
  // const arr = [...booksByTitle, ...booksByAuthor]
  // let books = []
  // const map = new Map()
  // arr.forEach(item=>{
  //   if(!map.has(item._id)){
  //     map.set(item._id, true)
  //     books = [...books, item]
  //   }
  // })

  callback(null, CODE(200, 'Successful in gettings books', {}));
};
