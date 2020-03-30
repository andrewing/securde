import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;

const libraryLogSchema = new Schema({
  timeBorrowed: String,
  timeReturned: String,
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
});

libraryLogSchema.statics.addLog = (libraryLog, callback) => {
  return to(libraryLog.save().then(callback));
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

const LibraryLog = mongoose.model('librarylogs', libraryLogSchema);

export default LibraryLog;
