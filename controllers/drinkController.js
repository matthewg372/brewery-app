const express =  require(`express`)
const router = express.Router()
const Brewery = require(`../models/brewery`)
const User = require(`../models/user`)
const Drink = require(`../models/drink`)
const Comment = require(`../models/comments`)
const Img = require(`../models/img`)
const multer = require('multer')
const fs = require('fs')
const upload = multer({dest: "uploads/"})

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

router.get(`/:id`,async (req,res, next) => {
	try{
		const foundDrink = await Drink.findById(req.params.id)
		const foundComments = await Comment.find({drink:foundDrink.id}).populate('drink')
		console.log("FC",foundComments)
		res.render(`drinks/show.ejs`,{drink: foundDrink,comment:foundComments})
	}
	catch(error){
		next(error)
	}
	
})

router.get(`/:id/edit`,async (req,res, next) => {
	try{
		const foundBreweries = await Brewery.find({user:req.session.userId})
		const foundDrink = await Drink.findById(req.params.id)
		res.render(`drinks/edit.ejs`,{
			drink: foundDrink, 
			breweries: foundBreweries
		})
	}
	catch(error){
		next(error)
	}
})

router.post('/:id', upload.single('img'), async (req, res, next) =>{
	try{
		console.log("req.file",req.file)
		const imageData = fs.readFileSync(req.file.path)
		const createdImg = await Img.create({
			data: imageData,
			contentType: req.file.mimetype,
		})


		console.log("createdImg",createdImg);
	
		const updatedDrink = await Drink.findByIdAndUpdate(req.params.id,
			{img:createdImg.id}, 
			{new:true}
		)
		console.log("updatedDrink,after",updatedDrink)
		res.redirect(`/drink/${req.params.id}`)
	}
	catch(error){
		next(error)
	}
})

router.get(`/:id/image`, async (req, res, next) => {
	try{
		const foundDrink = await Drink.findById(req.params.id)
		const foundImg = await Img.findById(foundDrink.img)
		res.send(foundImg.data)
	}
	catch(error){
		next(error)
	}

})

router.delete(`/:id`, async (req, res, next) => {
	try{
		const deletedDrink = await Drink.findByIdAndRemove(req.params.id)
		res.redirect(`/brewery/manage`)
	}
	catch(error){
		next(error)
	}
})

router.put(`/:id`,async (req, res, next) => {
	try{
		const updatedDrink = await Drink.findByIdAndUpdate(req.params.id,req.body,{new:true})
		res.redirect(`/brewery/${updatedDrink.brewery}`)
	}
	catch(error){
		next(error)
	}
})


























module.exports = router