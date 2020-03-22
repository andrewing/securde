import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {create} from './create';
import {borrow} from './borrow';
import {review} from './review';
import {update} from './update';
import {remove} from './remove';

export const book = (route, ...rest) => {
  if (!route) def(...rest);
  else
    handlePath(
      route,
      [
        [create, 'create'],
        [borrow, 'borrow'],
        [review, 'review'],
        [update, 'update'],
        [remove, 'remove'],
      ],
      ...rest,
    );
};

const def = (event, context, callback) => {
  // This is the query "/user/?title=andrew"
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');
  const {title} = event.queryStringParameters;

  const book1 = 'andrew book'; // Get book from db

  callback(
    null,
    CODE[200]('Successful in gettings user', {book: book1, title}),
  );
};
