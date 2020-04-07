const mongoose = require('mongoose')
const brewerySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true

	},
	address:{
		type: String,
		required: true
	},
	user:{
		type: mongoose.Schema.Types.ObjectId
		required: true
		ref: 'User'
	}
})

const Brewery = mongoose.model(`Brewery`, brewerySchema)
module.exports = Brewery