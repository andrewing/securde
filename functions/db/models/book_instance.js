import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;

const bookInstanceSchema = new Schema({
  time: String,
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  isAvailable: Boolean,
});

bookInstanceSchema.statics.addBookIntance = (bookInstance, callback) => {
  return to(bookInstance.save().then(callback));
};

bookInstanceSchema.statics.findBookInstanceById = async bookInstanceID => {
  return to(
    BookInstance.findOne({
      _id: bookInstanceID,
    }).populate('book'),
  );
};

bookInstanceSchema.statics.findAllBookInstances = async () => {
  return to(BookInstance.find().populate('book'));
};

bookInstanceSchema.statics.findAllAvailable = async () => {
  return to(
    BookInstance.find({
      isAvailable: true,
    }).populate('book'),
  );
};

bookInstanceSchema.statics.findAllReserved = async () => {
  return to(
    BookInstance.find({
      isAvailable: false,
    }).populate('book'),
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
        status: book.status,
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
