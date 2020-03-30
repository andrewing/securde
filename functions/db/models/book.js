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
  return to(
    Book.find({})
      .populate('reviews')
      .sort({
        title: 1,
      }),
  );
};

bookSchema.statics.findBookByID = async bookID => {
  Book.findOne({
    _id: bookID,
  })
    .populate('reviews')
    .exec((err, res) => {
      console.log(res);
    });
};

bookSchema.statics.findBookByAuthor = async name => {
  Book.find({
    author: name,
  })
    .populate('reviews')
    .exec((err, res) => {
      console.log(res);
    });
};

bookSchema.statics.findBookByTitle = async booktitle => {
  return Book.find({
    title: {$regex: `.*${booktitle}.*`},
  }).populate('reviews');
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
        reviews: book.reviews,
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

const Book = mongoose.model('Book', bookSchema);

export default Book;
