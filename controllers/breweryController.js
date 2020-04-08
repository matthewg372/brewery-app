const express =  require(`express`)
const router = express.Router()
const Brewery = require(`../models/brewery`)
const User = require(`../models/user`)

router.get("/manage", async (req, res,next) => {
	try{
		const foundBreweries = await Brewery.find({user: req.session.userId}).populate('user')
		res.render('brewery/manage.ejs', {
			breweries: foundBreweries
		})

	}catch(err){
		next(err)
	}
})

router.get('/manage/new', (req, res) => {
	res.render('brewery/new.ejs')
})

router.post("/manage/new", async (req,res,next) => {
	try{

		//Change this to not have two of the same breweries made by users//
		
		const breweryToCreate = {
			name: req.body.name,
			city: req.body.city,
			address: req.body.address,
			state: req.body.state,
			zipcode: req.body.zipcode,
			user: req.session.userId
		}
		const createdBrewery = await Brewery.create(breweryToCreate)
		req.session.message = `${req.body.name}`
		res.redirect('/brewery/manage')

	}catch(err){
		next(err)
	}
})

router.get('/:id', async(req, res, next) => {
	const foundUser = await User.findById(req.params.userId)
	const foundBrewery = await Brewery.findById(req.params.id).populate('user')
	res.render('brewery/show.ejs', {
		user: foundUser,
		brewery: foundBrewery
	})
})

router.get(`/:id/edit`, async (req, res, next) => {
	try{
		const foundBrewery = await Brewery.findById(req.params.id)
		res.render(`brewery/edit.ejs`, {brewery:foundBrewery})
	}
	catch(error){
		next(error)
	}
})

router.delete(`/:id`, async (req, res, next) => {
	try{
		const deletedBrewery = await Brewery.findOneAndRemove(req.params.id)
		res.redirect('/brewery/manage')
	}
	catch(error){
		next(error)
	}
})

router.put(`/:id`, async (req, res, next) => {
	try{

	  	const updatedBrewery = await Brewery.findByIdAndUpdate(req.params.id,req.body,{new:true})
	  	//maybe need ^^.populate
	  	res.redirect('/brewery/manage')
	}
	catch(error){
		next(error)
	}
})




















module.exports = router