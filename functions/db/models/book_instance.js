import mongoose from 'mongoose';

const {Schema} = mongoose;

const bookInstanceSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  status: String,
});

bookInstanceSchema.statics.addBookIntance = (bookInstance, callback) => {
  bookInstance.save().then(callback);
};

bookInstanceSchema.statics.getAllBookInstances = async () => {
  return this.find();
};

bookInstanceSchema.statics.getAllAvailable = async () => {
  return this.find({status: 'Available'});
};

bookInstanceSchema.statics.getAllReserved = async () => {
  return this.find({status: 'Reserved'});
};

bookInstanceSchema.statics.updateBookInstance = async (
  bookInstanceID,
  book,
) => {
  return this.updateOne(
    {
      _id: bookInstanceID,
    },
    {
      status: book.status,
    },
    {
      new: true,
    },
  );
};

bookInstanceSchema.statics.deleteBookInstance = async bookInstanceID => {
  return this.deleteOne({
    _id: bookInstanceID,
  });
};

const BookInstance = mongoose.model('bookinstances', bookInstanceSchema);

export default BookInstance;
