const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var systemLogSchema = new Schema({
	time: String,
	action: String,
	content: String
})

systemLogSchema.statics.addLog = (systemLog, callback) => {
	systemLog.save().then(callback)
}

systemLogSchema.statics.findAllLogs = async () => {
	return await this.find();
}

var SystemLog = mongoose.model("systemlogs", systemLogSchema)

module.exports = { SystemLog }