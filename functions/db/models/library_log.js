import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;

const libraryLogSchema = new Schema({
  time: String,
  bookID: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  accountID: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
});

libraryLogSchema.statics.addLog = (libraryLog, callback) => {
  return to(libraryLog.save().then(callback));
};

libraryLogSchema.statics.findLibraryLogsByAccount = async accountID => {
  return to(
    LibraryLog.find({
      accountID,
    }),
  );
};

libraryLogSchema.statics.deleteLibraryLogsByAccount = async accountID => {
  return to(
    LibraryLog.deleteMany({
      accountID,
    }),
  );
};

const LibraryLog = mongoose.model('librarylogs', libraryLogSchema);

export default LibraryLog;
