const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var bookSchema = new Schema({
	title: String,
	author: [String],
	publisher: String,
	yearOfPublication: Number,
	ISBN: String,
	callNumber: String,
	reviews: [{
		type: Schema.Types.ObjectId,
		ref: "Review"
	}]
})

bookSchema.statics.addBook = (book, callback) => {
	book.save().then(callback);
}

bookSchema.statics.findAllBooks = async () => {
	return await Book.find({}).populate("review").sort({'title': 1});
}

bookSchema.statics.findBookByID = async (bookID) => {
	return await Book.findOne({
		_id: bookID
	}).populate("review");
}

bookSchema.statics.findBookByAuthor = async (name) => {
	return await Book.find({
		author: name
	}).populate("review");
}

bookSchema.statics.findBookByTitle = async (booktitle) => {
	return await Book.find({
		'title': { $regex: ".*" + booktitle + ".*" }
	}).populate("review");
}

bookSchema.statics.updateBook = async (bookID, book) => {
	return await Book.updateOne({
		_id: bookID
	}, {
		title: book.title,
		author: book.author,
		publisher: book.publisher,
		yearOfPublication: book.yearOfPublication,
		ISBN: book.ISBN,
		callNumber: book.callNumber,
		reviews: book.reviews
	}, {
		new: true
	})
}

bookSchema.statics.deleteBook = async (bookID) => {
	return await Book.deleteOne({
		_id: bookID
	})
}

bookSchema.methods.populateReviews = async () => {
	return await Book.findOne({
		_id: this.id
	}).populate("review");
}

var Book = mongoose.model("books", bookSchema)

module.exports = { Book }