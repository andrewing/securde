import mongoose from 'mongoose';
import moment from 'moment';

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
  review.save().then(callback);
};

reviewSchema.statics.findReviewsByAccount = async accountID => {
  return this.find({
    accountID,
  });
};

reviewSchema.statics.deleteReview = async reviewID => {
  return Review.deleteOne({
    _id: reviewID,
  });
};

reviewSchema.statics.updateReview = async (reviewID, content) => {
  return Review.updateOne(
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
  );
};

const Review = mongoose.model('reviews', reviewSchema);

export default Review;
