import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';
import {create} from './create';
import db from '../../db/db';
import Review from '../../db/models/review';

export default (route, ...rest) => {
  if (!route) def(...rest);
  else handlePath(route, [[create, 'create']], ...rest);
};

const def = async (event, context, callback) => {
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');
  const {accountID} = event.queryStringParameters;

  const reviews = await Review.findReviewsByAccount(accountID);

  callback(null, CODE[200]('Successful in user reviews', {reviews}));
};
