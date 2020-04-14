import mongoose from 'mongoose';
import {CODE} from './util/code';
import User from './db/models/account';

const dbUrl =
  'mongodb://uvhzji8iwtsacblx2yjs:wnhhaTah8v5poCUBFy89@bv9wjyqjtkvgm59-mongodb.services.clever-cloud.com:27017/bv9wjyqjtkvgm59';
const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  // useUnifiedTopology: false,
};
// const ERROR = 'error';
// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions);

export const handler = (event, context, callback) => {
  User.find().then(accounts => {
    callback(null, CODE(200, 'This test is working!', {accounts}));
  });
};
