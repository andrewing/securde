import mongoose from 'mongoose';
import moment from 'moment';
import to from '../../util/to';

const {Schema} = mongoose;

const reviewSchema = new Schema({
  time: String,
  content: String,
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
});

reviewSchema.statics.addReview = (review, callback) => {
  return to(review.save().then(callback));
};

// TODO: stanley
reviewSchema.statics.findReviewsByAccount = id => {
  const accountId = mongoose.Types.ObjectId(id);
  return to(
    Review.find().populate({
      path: 'accountId',
      match: {
        _id: accountId,
      },
    }),
  );
};

reviewSchema.statics.findReviewsByBook = id => {
  const bookId = mongoose.Types.ObjectId(id);
  return to(
    Review.find().populate({
      path: 'bookId',
      match: {
        _id: bookId,
      },
    }),
  );
};

reviewSchema.statics.updateReview = async (reviewId, content) => {
  return to(
    Review.updateOne(
      {
        _id: reviewId,
      },
      {
        content,
        time: moment().format(),
      },
      {
        new: true,
      },
    ),
  );
};

reviewSchema.statics.deleteReview = async reviewId => {
  return to(
    Review.deleteOne({
      _id: reviewId,
    }),
  );
};

reviewSchema.statics.deleteReviewByAccount = async accountId => {
  return to(
    Review.deleteMany({
      accountId,
    }),
  );
};

const Review = mongoose.model('Review', reviewSchema, 'reviews');

export default Review;
