const express =  require(`express`)
const router = express.Router()
const Brewery = require(`../models/brewery`)
const User = require(`../models/user`)
const Drink = require(`../models/drink`)

router.get(`/new`, (req,res) => {
	res.render(`drinks/new.ejs`)
})


























module.exports = router