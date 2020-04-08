const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body:{
		type: String,
		required: true,
	},
	posted: {
		type: Date,
		default: Date.now,
	},
	rating: Number,
	user:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	drink:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Drink',
	},
})
const Comment = mongoose.model(`Comment`, commentSchema)
module.exports = Comment