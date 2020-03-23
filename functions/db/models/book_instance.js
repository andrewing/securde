const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var bookInstanceSchema = new Schema({
	book: {
		type: Schema.Types.ObjectId,
		ref: "Book"
	},
	status: String,
})

bookInstanceSchema.statics.addBookIntance = (bookInstance, callback) => {
	bookInstance.save().then(callback);
}

bookInstanceSchema.statics.getAllBookInstances = async () => {
	return await this.find();
}

bookInstanceSchema.statics.getAllAvailable = async () => {
	return await this.find({ status: "Available" })
}

bookInstanceSchema.statics.getAllReserved = async () => {
	return await this.find({ status: "Reserved" })
}

bookInstanceSchema.statics.updateBookInstance = async (bookInstanceID, book) => {
	return await this.updateOne({
		_id: bookInstanceID
	}, {
		status: bookInstance.status
	}, {
		new: true
	})
}

bookInstanceSchema.statics.deleteBookInstance = async (bookInstanceID) => {
	return await this.deleteOne({
		_id: bookInstanceID
	})
}

var BookInstance = mongoose.model("bookinstances", bookInstanceSchema)

module.exports = { BookInstance }