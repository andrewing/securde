import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import {AUDIENCE} from '../../util/constants';
import Account from '../../db/models/account';

export const getQuestion = (route, event, context, callback) => {
  if (event.httpMethod !== 'GET') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {authorization} = event.headers;

  jwt.verify(
    authorization,
    SECRET,
    {
      audience: [
        AUDIENCE.ADMIN,
        AUDIENCE.BOOK_MANAGER,
        AUDIENCE.USER_STUDENT,
        AUDIENCE.USER_TEACHER,
      ],
    },
    async (err, decoded) => {
      if (err) {
        callback(null, jwtError(err, decoded && decoded.user.username, ''));
        return;
      }
      const {user} = decoded;
      Account.findById(user._id)
        .then(account => {
          callback(
            null,
            CODE(200, 'Successfully got question', {
              question: account.question,
            }),
          );
        })
        .catch(authErr => {
          const {code, message} = authErr;
          callback(null, CODE(code || 500, message));
        });
    },
  );
};
