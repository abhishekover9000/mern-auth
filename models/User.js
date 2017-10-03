const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	googleID: String,
	facebookID: String,
	email: String,
	username: String,
	password: String
});

userSchema.plugin(passportLocalMongoose);

mongoose.model("User", userSchema);
