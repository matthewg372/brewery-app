const BrewerySchema = new mongoose.Schema({
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
})
