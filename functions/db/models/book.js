import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;

const bookSchema = new Schema({
  title: String,
  author: [String],
  publisher: String,
  yearOfPublication: Number,
  ISBN: String,
  callNumber: String,
});

bookSchema.statics.addBook = (book, callback) => {
  return to(book.save().then(callback));
};

bookSchema.statics.findAllBooks = async () => {
  return to(
    Book.find({}).sort({
      title: 1,
    }),
  );
};

bookSchema.statics.findBookByID = async bookId => {
  return to(
    Book.findOne({
      _id: bookId,
    }),
  );
};

bookSchema.statics.findBookByAuthor = async name => {
  return to(
    Book.find({
      author: name,
    }),
  );
};

bookSchema.statics.findBookByTitle = async booktitle => {
  return to(
    Book.find({
      title: {$regex: `.*${booktitle}.*`},
    }),
  );
};

bookSchema.statics.updateBook = async (bookID, book) => {
  return to(
    Book.updateOne(
      {
        _id: bookID,
      },
      {
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        yearOfPublication: book.yearOfPublication,
        ISBN: book.ISBN,
        callNumber: book.callNumber,
      },
      {
        new: true,
      },
    ),
  );
};

bookSchema.statics.deleteBook = async bookID => {
  return to(
    Book.deleteOne({
      _id: bookID,
    }),
  );
};

const Book = mongoose.model('Book', bookSchema, 'books');

export default Book;
