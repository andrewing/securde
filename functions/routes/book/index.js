import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';

export default (route, ...rest) => {
  if (!route) def(...rest);
  handlePath(route, [], ...rest);
};

const def = (event, context, callback) => {
  // This is the query "/user/?username=andrew"
  if (event.httpMethod !== 'GET')
    throw new ResponseError(405, 'Method not allowed!');
  const {title} = event.queryStringParameters;

  const book = 'andrew book'; // Get user from db

  callback(
    null,
    CODE[200]('Successful in gettings user', {data: {book, title}}),
  );
};
