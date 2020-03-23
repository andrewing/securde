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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

bookSchema.statics.addBook = (book, callback) => {
  return to(book.save().then(callback));
};

bookSchema.statics.findAllBooks = async () => {
  return Book.find({})
    .populate('review')
    .sort({title: 1});
};

bookSchema.statics.findBookByID = async bookID => {
  return Book.findOne({
    _id: bookID,
  }).populate('review');
};

bookSchema.statics.findBookByAuthor = async name => {
  return Book.find({
    author: name,
  }).populate('review');
};

bookSchema.statics.findBookByTitle = async booktitle => {
  return to(
    Book.find({
      title: {$regex: `.*${booktitle}.*`},
    }).populate('review'),
  );
};

bookSchema.statics.updateBook = async (bookID, book) => {
  return Book.updateOne(
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
      reviews: book.reviews,
    },
    {
      new: true,
    },
  );
};

bookSchema.statics.deleteBook = async bookID => {
  return Book.deleteOne({
    _id: bookID,
  });
};

bookSchema.methods.populateReviews = async () => {
  return Book.findOne({
    _id: this.id,
  }).populate('review');
};

const Book = mongoose.model('books', bookSchema);

export default Book;
