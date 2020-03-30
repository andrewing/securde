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

bookInstanceSchema.statics.addBookInstance = (bookInstance, callback) => {
  return to(bookInstance.save().then(callback));
};

bookInstanceSchema.statics.findAllBookInstances = () => {
  return to(BookInstance.find().populate('bookID'));
};

bookInstanceSchema.statics.findAllAvailable = () => {
  return to(
    BookInstance.find({
      isReserved: false,
    }).populate('bookID'),
  );
};

bookInstanceSchema.statics.findAllReserved = () => {
  return to(
    BookInstance.find({
      isReserved: true,
    }).populate('bookID'),
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
