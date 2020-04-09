const express =  require(`express`)
const router = express.Router()
const Brewery = require(`../models/brewery`)
const User = require(`../models/user`)
const Drink = require(`../models/drink`)
const Comment = require(`../models/comments`)

router.get("/", async (req, res, next) => {
	const foundBreweries = await Brewery.find({}).populate('user')
	res.render('user/index.ejs', {breweries: foundBreweries})
	
})

router.get(`/drink/:id`,async (req,res, next) => {
	try{
		const foundDrink = await Drink.findById(req.params.id).populate('brewery')
		const foundComments = await Comment.find({drink: req.params.id})
		console.log(foundDrink);
		res.render(`user/drinkShowPage.ejs`,{
			drink: foundDrink,
			comments: foundComments
		})
	}
	catch(error){
		next(error)
	}
	
})
router.get("/:id", async (req, res, next) => {
	const foundBrewery = await Brewery.findById(req.params.id).populate('user')
	const foundDrinks = await Drink.find({brewery: foundBrewery._id})
	res.render('user/breweriesShow.ejs', {
		brewery: foundBrewery,
		drinks: foundDrinks
	})
	
})




module.exports = router