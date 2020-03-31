import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;
const Book = require('./book');

const bookInstanceSchema = new Schema({
  time: String,
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  isAvailable: Boolean,
});

bookInstanceSchema.statics.addBookInstance = (bookInstance, callback) => {
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

bookInstanceSchema.statics.findAllAvailable = () => {
  return to(
    BookInstance.find({
      isAvailable: true,
    }).populate('book'),
  );
};

bookInstanceSchema.statics.findAllReserved = () => {
  return to(
    BookInstance.find({
      isAvailable: false,
    }).populate('book'),
  );
};

bookInstanceSchema.statics.borrowBookInstance = bookInstanceID => {
  return to(
    BookInstance.updateOne(
      {
        _id: bookInstanceID,
      },
      {
        isReserved: true,
      },
      {
        new: true,
      },
    ),
  );
};

bookInstanceSchema.statics.returnBookInstance = bookInstanceID => {
  return to(
    BookInstance.updateOne(
      {
        _id: bookInstanceID,
      },
      {
        isReserved: false,
      },
      {
        new: true,
      },
    ),
  );
};

bookInstanceSchema.statics.deleteBookInstance = bookInstanceID => {
  return to(
    BookInstance.deleteOne({
      _id: bookInstanceID,
    }),
  );
};

const BookInstance = mongoose.model(
  'BookInstance',
  bookInstanceSchema,
  'bookinstances',
);

export default BookInstance;
