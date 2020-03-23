import mongoose from 'mongoose';
import crypto from 'crypto';

const {Schema} = mongoose;

const validateEmail = email => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const accountSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String,
  idNumber: String,
  question: String,
  answer: String,
  userType: Number, // 0 = administrator, 1 = book manager, 2 = student/teacher, 3 = anonymous user
  salt: String,
});

accountSchema.statics.authenticate = async (username, password, salt) => {
  const hashed = sha512(password, salt).hashedPassword;
  return this.findOne({
    username,
    password: hashed,
  });
};

accountSchema.statics.addAccount = (account, callback) => {
  const passwordData = saltHashPassword(account.password);
  account.password = passwordData.hashedPassword;
  account.salt = passwordData.salt;
  account.save().then(callback);
};

accountSchema.statics.findAllUsers = async () => {
  return Account.find();
};

accountSchema.statics.findNonAdminUsers = async () => {
  return Account.find({userType: {$gt: 1}});
};

accountSchema.statics.findAccountById = async accountID => {
  return this.findOne({
    _id: accountID,
  });
};

accountSchema.statics.deleteAccount = async accountID => {
  return this.deleteOne({
    _id: accountID,
  });
};

accountSchema.statics.updateAccount = async (accountID, account) => {
  const hashed = saltHashPassword(account.password);
  return this.updateOne(
    {
      _id: accountID,
    },
    {
      firstname: account.firstname,
      lastname: account.lastname,
      username: account.username,
      password: hashed.hashedPassword,
      salt: hashed.salt,
      email: account.email,
      idNumber: account.idNumber,
      question: account.question,
      answer: account.answer,
      userType: account.userType,
    },
    {
      new: true,
    },
  );
};

const genRandomString = length => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

const sha512 = (password, salt) => {
  const hash = crypto.createHmac(
    'sha512',
    salt,
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt,
    hashedPassword: value,
  };
};

function saltHashPassword(userpassword) {
  const salt = genRandomString(16); /** Gives us salt of length 16 */
  const passwordData = sha512(userpassword, salt);
  return {
    hashedPassword: passwordData.hashedPassword,
    salt,
  };
}

const Account = mongoose.model('accounts', accountSchema);

export default {Account};
