import mongoose from 'mongoose';
import moment from 'moment';
import to from '../../util/to';

const {Schema} = mongoose;

const reviewSchema = new Schema({
  time: String,
  content: String,
  bookID: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  accountID: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
});

reviewSchema.statics.addReview = (review, callback) => {
  return to(review.save().then(callback));
};

reviewSchema.statics.findReviewsByAccount = async accountID => {
  return to(
    Review.find({
      accountID,
    }).populate('bookID accountID'),
  );
};

reviewSchema.statics.findReviewsByBook = async bookID => {
  return to(
    Review.find({
      bookID,
    }).populate('bookID accountID'),
  );
};

reviewSchema.statics.updateReview = async (reviewID, content) => {
  return to(
    Review.updateOne(
      {
        _id: reviewID,
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

reviewSchema.statics.deleteReview = async reviewID => {
  return to(
    Review.deleteOne({
      _id: reviewID,
    }),
  );
};

reviewSchema.statics.deleteReviewByAccount = async accountID => {
  return to(
    Review.deleteMany({
      accountID,
    }),
  );
};

const Review = mongoose.model('reviews', reviewSchema);

export default Review;
