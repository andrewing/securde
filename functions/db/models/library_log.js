import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;

const libraryLogSchema = new Schema({
  timeBorrowed: String,
  timeReturned: String,
  bookInstanceId: {
    type: Schema.Types.ObjectId,
    ref: 'BookInstance',
  },
  accountId: {
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
    }),
  );
};

libraryLogSchema.statics.findLibraryLogsByAccount = async accountId => {
  return to(
    LibraryLog.find({
      accountId,
    }),
  );
};

libraryLogSchema.statics.deleteLibraryLogsByAccount = accountId => {
  return to(
    LibraryLog.deleteMany({
      accountId,
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
