import jwt from 'jsonwebtoken';
import {CODE} from '../../util/code';
import {SECRET, jwtError} from '../../util/jwt';
import ResponseError from '../../util/error';
import {AUDIENCE} from '../../util/constants';
import Account from '../../db/models/account';

export const forgotpassword = (route, event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    callback(null, CODE(405, 'Method not allowed'));
    return;
  }
  const {authorization} = event.headers;
  const data = JSON.parse(event.body);
  const {newPassword, answer} = data;

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
      const found = await Account.findById(user._id);
      if (found.answer.toLowerCase() === answer.toLowerCase()) {
        Account.changePassword(user._id, newPassword)
          .then(() => {
            callback(null, CODE(200, 'Password changed!'));
          })
          .catch(authErr => {
            const {code, message} = authErr;
            callback(null, CODE(code || 500, message));
          });
      } else {
        callback(null, CODE(401, 'Incorrect answer'));
      }
    },
  );
};
