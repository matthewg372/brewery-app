const mongoose = require('mongoose')
const drinkSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true

	},
	posted: {
		type: Date,
		default: Date.now
	},
	description: String,
})

const Drink = mongoose.model(`Drink`, drinkSchema)
module.exports = Drink