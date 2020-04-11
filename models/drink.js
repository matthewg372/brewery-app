const mongoose = require('mongoose')
const drinkSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	posted: {
		type: Date,
		default: Date.now,
	},
	brewery:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Brewery',
	},
	img:{
		type: String,
	},
})

const Drink = mongoose.model(`Drink`, drinkSchema)
module.exports = Drink