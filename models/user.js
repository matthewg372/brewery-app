const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true,
	},
	password:{
		type: String,
		required: true,
	},
	admin: Boolean,
})
const User = mongoose.model(`User`, userSchema)
module.exports = User