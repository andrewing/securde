import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;
const Book = require('./book_instance');
const Account = require('./account');

const libraryLogSchema = new Schema({
  timeBorrowed: String,
  timeReturned: String,
  book: {
    type: Schema.Types.ObjectId,
    ref: 'BookInstance',
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
});

libraryLogSchema.statics.addLog = (libraryLog, callback) => {
  return to(libraryLog.save().then(callback));
};

libraryLogSchema.statics.findLibraryLogsByBook = bookInstanceId => {
  return to(
    LibraryLog.find({
      bookInstanceId,
    }).populate('book account'),
  );
};

libraryLogSchema.statics.findLibraryLogsByAccount = async accountId => {
  return to(
    LibraryLog.find({
      account: accountId,
    }).populate('book account'),
  );
};

libraryLogSchema.statics.deleteLibraryLogsByAccount = accountId => {
  return to(
    LibraryLog.deleteMany({
      account: accountId,
    }),
  );
};

libraryLogSchema.statics.logReturn = (logId, timeReturned) => {
  return to(
    LibraryLog.updateOne(
      {
        _id: logId,
      },
      {
        timeReturned,
      },
      {
        new: true,
      },
    ),
  );
};

const LibraryLog = mongoose.model(
  'LibraryLog',
  libraryLogSchema,
  'librarylogs',
);

export default LibraryLog;
