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
<<<<<<< HEAD
	img:{
		type: String,
	},
=======
	// img:{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Img',
	// },
	img:String,
>>>>>>> 4a249c15c374774d9be1873d4f8c391704148a9c


	user:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
})

const Brewery = mongoose.model(`Brewery`, brewerySchema)
module.exports = Brewery