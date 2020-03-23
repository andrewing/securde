const mongoose = require("mongoose")
const crypto = require("crypto")
const Schema = mongoose.Schema;

var validateEmail = function(email) {
	var regex = /^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/;
	return regex.test(email);
}

var accountSchema = new Schema({
	firstname: String,
	lastname: String,
	username: String,
	password: String,
	email: String,
	idNumber: String,
	question: String,
	answer: String,
	userType: Number,	// 0 = administrator, 1 = book manager, 2 = student/teacher, 3 = anonymous user
	salt: String
})

accountSchema.statics.authenticate = async (username, password, salt) => {
    var hashed = sha512(password, salt).hashedPassword
    return await this.findOne({
        username,
        password: hashed
    });
}

accountSchema.statics.addAccount = (account, callback) => {
	var passwordData = saltHashPassword(account.password);
    account.password = passwordData.hashedPassword;
    account.salt = passwordData.salt;
	account.save().then(callback);
}

accountSchema.statics.findAllUsers = async () => {
	return await Account.find();
}

accountSchema.statics.findNonAdminUsers = async () => {
	return await Account.find({ userType: { $gt: 1 } })
}

accountSchema.statics.findAccountById = async (accountID) => {
	return await this.findOne({
		_id: accountID
	});
}

accountSchema.statics.deleteAccount = async (accountID) => {
	return await this.deleteOne({
		_id: accountID
	})
}

accountSchema.statics.updateAccount = async (accountID, account) => {
	var hashed = saltHashPassword(account.password)
	return await this.updateOne({
		_id: accountID
	}, {
		firstname: account.firstname,
		lastname: account.lastname,
		username: account.username,
		password: hashed.hashedPassword,
        salt: hashed.salt,
		email: account.email,
		idNumber: account.idNumber,
		question: account.question,
		answer: account.answer,
		userType: account.userType
	}, {
		new: true
	})
}

var genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0,length);   /** return required number of characters */
};

var sha512 = (password, salt) => {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt,
        hashedPassword:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return {
        hashedPassword: passwordData.hashedPassword,
        salt
    }
}

var Account = mongoose.model("accounts", accountSchema)

module.exports = { Account }