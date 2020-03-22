import {handlePath} from '../../util/router';
import ResponseError from '../../util/error';
import {CODE} from '../../util/code';

export default (route, ...rest) => {
  if (!route) def(...rest);
  handlePath(route, [], ...rest);
};

const def = (event, context, callback) => {
  // This is the query "/user/?username=andrew"
  if (event.httpMethod !== 'POST')
    throw new ResponseError(405, 'Method not allowed!');
  const {username} = event.queryStringParameters;

  const user = 'andrew'; // Get user from db

  callback(
    null,
    CODE[200]('Successful in gettings user', {name: 'user', data: user}),
  );
};
