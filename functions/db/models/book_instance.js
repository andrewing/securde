import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;

const bookInstanceSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  isReserved: Boolean,
});

bookInstanceSchema.statics.addBookIntance = (bookInstance, callback) => {
  return to(bookInstance.save().then(callback));
};

bookInstanceSchema.statics.findAllBookInstances = async () => {
  return to(BookInstance.find().populate('bookID'));
};

bookInstanceSchema.statics.findAllAvailable = async () => {
  return to(
    BookInstance.find({
      isReserved: false,
    }).populate('bookID'),
  );
};

bookInstanceSchema.statics.findAllReserved = async () => {
  return to(
    BookInstance.find({
      isReserved: true,
    }).populate('bookID'),
  );
};

bookInstanceSchema.statics.updateBookInstance = async (
  bookInstanceID,
  book,
) => {
  return to(
    BookInstance.updateOne(
      {
        _id: bookInstanceID,
      },
      {
        isReserved: book.isReserved,
      },
      {
        new: true,
      },
    ),
  );
};

bookInstanceSchema.statics.deleteBookInstance = async bookInstanceID => {
  return to(
    BookInstance.deleteOne({
      _id: bookInstanceID,
    }),
  );
};

const BookInstance = mongoose.model('bookinstances', bookInstanceSchema);

export default BookInstance;
