const express =  require(`express`)
const router = express.Router()
const Brewery = require(`../models/brewery`)
const User = require(`../models/user`)
const Drink = require(`../models/drink`)

router.get(`/new`, async (req,res, next) => {
	try{
		const foundBreweries = await Brewery.find({user:req.session.userId})
		console.log("foundBreweries",foundBreweries)
		res.render(`drinks/new.ejs`,{foundBreweries:foundBreweries})
	}
	catch(error){
		next(error)
	}
	
})

router.post('/new', async (req, res, next) => {
	try{
		// const foundBrewery = await Brewery.findOne({user:req.session.userId})
		const drinkToCreate = {
			name: req.body.name,
			description: req.body.description,
			brewery: req.body.brewery
		}
		console.log("drinkToCreate",drinkToCreate)
		const createdDrink = await Drink.create(drinkToCreate)

		res.redirect(`/brewery/${drinkToCreate.brewery}`)
	}
	catch(error){
		next(error)
	}
})
























module.exports = router