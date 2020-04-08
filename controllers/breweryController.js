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
		console.log("locals", res.locals);
		const breweryToCreate = {
			name: req.body.name,
			city: req.body.city,
			address: req.body.address,
			state: req.body.state,
			zipcode: req.body.zipcode,
			user: req.session.userId
		}
		const createdBrewery = await Brewery.create(breweryToCreate)
		res.session.message = `${req.body.name}`
		res.redirect('/brewery/manage')

	}catch(err){
		next(err)
	}
})

// router.get('/:id', async(req, res, next) => {
// 	const foundUser = await User.findById(req.params.userId)
// 	const foundBrewery = await Brewery.findById(req.params.id).populate('user')
// 	res.render('brewery/show.ejs', {
// 		user: foundUser,
// 		brewery: foundBrewery
// 	})
// })


module.exports = router