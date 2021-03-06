const express =  require(`express`)
const router = express.Router()
const multer = require('multer')
const User = require(`../models/user`)
const Img = require(`../models/img`)
const Drink = require(`../models/drink`)
const fs = require('fs')
const Brewery = require(`../models/brewery`)
const upload = multer({dest: "uploads/"})

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
		const foundBreweryWithName = await Brewery.findOne({name:req.body.name})
		// console.log("Newbrew",foundBreweryWithName )
		if(!foundBreweryWithName){//if nothing in arr, name doesnt exist yet
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
		}
		else{
			req.session.message = `ERROR !!! Brewery with that name already exists`
			res.redirect('/brewery/manage/new')
		}
	}catch(err){
		next(err)
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
	
		const updatedBrewery = await Brewery.findByIdAndUpdate(req.params.id,
			{img:createdImg.id}, 
			{new:true}
		)
		console.log("updatedBrewery,after",updatedBrewery)
		res.redirect(`/brewery/${req.params.id}`)
	}
	catch(error){
		next(error)
	}
})

router.get(`/:id/image`, async (req, res, next) => {
	try{
		const foundBrewery = await Brewery.findById(req.params.id)
		const foundImg = await Img.findById(foundBrewery.img)
		res.send(foundImg.data)
	}
	catch(error){
		next(error)
	}

})



router.get('/:id', async(req, res, next) => {
	const foundUser = await User.findById(req.params.userId)
	const foundBrewery = await Brewery.findById(req.params.id).populate('user')
	const foundDrinks = await Drink.find({brewery:foundBrewery._id})
	// const foundImg = await Img.findOne()
	res.render('brewery/show.ejs', {
		// imgs: foundImg,
		user: foundUser,
		brewery: foundBrewery,
		drinks:foundDrinks
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
		const deletedBrewery = await Brewery.findByIdAndRemove(req.params.id)
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

