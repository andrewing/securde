const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const moment = require('moment');

var reviewSchema = new Schema({
    time: String,
	content: String,
	bookID: {
		type: Schema.Types.ObjectId,
		ref: "Book"
	},
	accountID: {
		type: Schema.Types.ObjectId,
		ref: "Account"
	}
})

reviewSchema.statics.addReview = (review, callback) => {
	review.save().then(callback);
}

reviewSchema.statics.findReviewsByAccount = async (accountID) => {
	return await this.find({
		accountID
	});
}

reviewSchema.statics.deleteReview = async (reviewID) => {
	return await Review.deleteOne({
		_id: reviewID
	})
}

reviewSchema.statics.updateReview = async (reviewID, content) => {
	return await Review.updateOne({
		_id: reviewID
	}, {
		content: content,
		time: moment().format()
	}, {
		new: true
	})
}

var Review = mongoose.model("reviews", reviewSchema)

module.exports = { Review }