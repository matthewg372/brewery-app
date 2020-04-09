const express =  require(`express`)
const router = express.Router()
const Comment = require('../models/comments')
const Brewery = require(`../models/brewery`)
// const User = require(`../models/user`)
const Drink = require(`../models/drink`)

router.get('/', async (req,res,next) => {
	try{
		const foundComments = await Comment.find({user: req.session.userId}).populate('drink')
		// const brewery = foundComments.drink.populate('brewery')
		// console.log("brewery", brewery);
		const foundBrewery = await Drink.find({drinks: foundComments.id}).populate('brewery')
		console.log("foundBrewery", foundBrewery);
		res.render('comment/index.ejs' , {
			drinks: foundBrewery,
			comments: foundComments
		})

	}catch(err){
		next(err)
	}
})

router.post('/:id', async (req,res,next) => {
	try{
		const commentsToAdd ={
			title: req.body.title,
			body: req.body.body,
			rating: req.body.rating,
			drink: req.params.id,
			user: req.session.userId,
		}
		const createdComment = await Comment.create(commentsToAdd)
		res.redirect('/general/drink/' + req.params.id)
	}catch(err){
		next(err)
	}

})

router.get('/:id')


module.exports = router