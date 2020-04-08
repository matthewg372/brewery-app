// Makinga comment to see if i can make changes to repo too

const BrewerySchema = new mongoose.Schema({
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
	}
	user:{
		type: mongoose.Schema.Types.ObjectId
		required: true
		ref: 'User'
	}
})



const drinkSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true

	},
	description: String,
	posted: {
		type: Date,
		default: Date.now
	},
	brewery:{
		type: mongoose.Schema.Types.ObjectId
		required: true
		ref: 'Brewery'
	}
})

const commentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true

	},
	body:{
		type: String,
		required: true
	},
	posted: {
		type: Date,
		default: Date.now
	},
	rating: Number
	user:{
		type: mongoose.Schema.Types.ObjectId
		required: true
		ref: 'User'
	},
	drink:{
		type: mongoose.Schema.Types.ObjectId
		required: true
		ref: 'Drink'
	}
})



const userSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	admin: Boolean
})