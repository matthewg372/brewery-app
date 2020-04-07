const mongoose = require('mongoose')
const brewerySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	city:{
		type: String,
		required: true
	},
	state:{
		type: String,
		required: true
	},
	address:{
		type: String,
		required: true
	},
	zipcode: {
		type: Number,
		required: true,
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
})

const Brewery = mongoose.model(`Brewery`, brewerySchema)
module.exports = Brewery